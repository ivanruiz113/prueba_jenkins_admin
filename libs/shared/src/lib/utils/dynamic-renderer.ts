import { ViewContainerRef, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { interval, take, startWith, Subscription } from 'rxjs';

const DEFAULT_RENDER_INTERVAL = 0;
const DEFAULT_ITEMS_PER_RENDER = 9;

export interface DynamicRendererOptions {
  /** Sobrescribe el intervalo de tiempo entre cada renderizacion de los items. */
  renderInterval?: number;
  /** Sobrescribe la cantidad de elementos a renderizar por pasada. */
  itemsPerRender?: number;
}

export interface RenderConfig extends Required<DynamicRendererOptions> {
  /** Indice del ultimo item renderizado */
  currentIndex: number;
}

export interface DynamicRendererRestartOptions extends DynamicRendererOptions {
  /** Sobrescribe el Array de datos a pasar para cada item a renderizar. */
  itemsData?: any[];
  /** Template que se empleará para cada item. */
  template?: TemplateRef<any>;
  /** Template que se empleará en caso de no haber items. */
  defaultTemplate?: TemplateRef<any>;
}

export interface DynamicRendererProps {
  /** Array de datos a pasar para cada item a renderizar. */
  itemsData: any[];
  /** Contenedor donde se renderizarán los templates. */
  viewContainerRef: ViewContainerRef;
  /** Referencia del detector ref */
  changesDetectorRef: ChangeDetectorRef;
  /** Template que se empleará para cada item. */
  template: TemplateRef<any>;
  /** Template que se empleará en caso de no haber items. */
  defaultTemplate?: TemplateRef<any>;
  /** Opciones adicionales para el dynamic renderer. */
  options?: DynamicRendererOptions;
}

export class DynamicRenderer {

  private readonly _viewContainerRef!: ViewContainerRef;
  private readonly _changesDetectorRef!: ChangeDetectorRef;

  private _renderConfig!: RenderConfig;
  private _rows: any[] = [];
  private _template!: TemplateRef<any>;
  private _defaultTemplate!: TemplateRef<any> | undefined;
  private _isDefTempRendered: boolean = false;
  private _subscriptions = new Subscription();

  constructor(props: DynamicRendererProps) {
    const { viewContainerRef,
      template,
      defaultTemplate,
      changesDetectorRef,
      itemsData,
    } = props;
    this._viewContainerRef = viewContainerRef;
    this._template = template;
    this._defaultTemplate = defaultTemplate;
    this._changesDetectorRef = changesDetectorRef;
    this._rows = itemsData || [];
    this._initializeConfig(props.options);
  }

  private _initializeConfig(opts?: DynamicRendererOptions): void {
    this._setConfig({
      itemsPerRender: opts?.itemsPerRender ? opts.itemsPerRender : DEFAULT_ITEMS_PER_RENDER,
      renderInterval: opts?.renderInterval ? opts.renderInterval : DEFAULT_RENDER_INTERVAL,
    });
  }

  /** Inicializacion de la clase. */
  private _setConfig(options?: DynamicRendererOptions): void {
    this._renderConfig = {
      currentIndex: 0,
      renderInterval: options?.renderInterval ?? DEFAULT_RENDER_INTERVAL,
      itemsPerRender: options?.itemsPerRender ?? DEFAULT_ITEMS_PER_RENDER,
    };
  }

  /**
   * Realiza una ronda de renderizado de items teniendo en cuenta
   * la cantidad de items a renderizar (itemsPerRender).
   */
  render(): void {
    // Sin container ni config, se interrumpe la funcion.
    if (!this._viewContainerRef
      && this._renderConfig
      && this._renderConfig.currentIndex >= this._rows.length) {
      return;
    }
    // Si no hay rows, muestro el template default en caso
    // de existir y si es que no se ha agregado aun y se
    // interrumpe la funcion.
    if (!this._rows.length) {
      if (this._defaultTemplate
        && !this._isDefTempRendered
        && !this._viewContainerRef.get(0)) {
        this._isDefTempRendered = true;
        this._viewContainerRef.createEmbeddedView(this._defaultTemplate);
      }
      this._isDefTempRendered = false;
      return;
    }
    // Armo el chunk de rows a agregar al viewcontainer (si es que hay) y
    // los agrego por intervalos en caso de estar seteada la config "itemsPerRender"
    // o sino directo.
    const from = this._renderConfig.currentIndex;
    const to = from + this._renderConfig.itemsPerRender;
    const slicedRows = this._rows.slice(from, to);
    if (this._renderConfig.renderInterval) {
      this._subscriptions.add(
        interval(this._renderConfig.renderInterval)
          .pipe(startWith(-1), take(this._renderConfig.itemsPerRender))
          .subscribe((index: number) => {
            const rowContext = slicedRows[index + 1];
            if (rowContext) {
              this._viewContainerRef.createEmbeddedView(this._template, rowContext);
            }
          })
      );
    } else {
      slicedRows.forEach((ctx: any) => {

        this._viewContainerRef.createEmbeddedView(this._template, ctx);
      });
    }
    this._renderConfig.currentIndex = to;
    this._changesDetectorRef?.markForCheck();
  }

  /**
   * Reincia el estado actual del dynamic renderer y realiza la
   * limpieza del view container.
   * @param options
   */
  restart(options?: DynamicRendererRestartOptions): void {
    if ((options?.itemsPerRender && options.itemsPerRender !== this._renderConfig.itemsPerRender)
      || (options?.renderInterval && options.renderInterval !== this._renderConfig.renderInterval)) {
      this._setConfig({
        itemsPerRender: options?.itemsPerRender ?? this._renderConfig.itemsPerRender,
        renderInterval: options?.renderInterval ?? this._renderConfig.renderInterval,
      });
    } else {
      this._renderConfig.currentIndex = 0;
    }
    this._subscriptions.unsubscribe();
    this._subscriptions = new Subscription();
    if (options?.itemsData) { this._rows = options.itemsData; }
    if (options?.template) { this._template = options.template; }
    if (options?.defaultTemplate) { this._defaultTemplate = options.defaultTemplate; }
    this._viewContainerRef?.clear();
  }

}
