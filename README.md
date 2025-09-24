# 1. BALANZ BACKOFFICE

Proyecto desarrollado con Nx y Angular para el backoffice de Balanz y sus distintos apartados.

## 1.1. Inicio

### 1.1.1. Prerequisitos

- Tener node v22.
- Tenes el cli de nx v21.4.1 (npm add --global nx@21.4.1).

### 1.1.2. Levantar ambiente local (host)

- Ejecutar el comando `npm i` para instalar todas las dependencias.
- Ejecutar el comando `nx serve shell` para inicializar el proyecto localmente.

> Si se requiere levantar algun remote con wa

### 1.1.3. Ejecutar remote standalone (remote)

- Ejecutar el comando `nx serve [remoteName]` (reemplazar `[remoteName]` por el remote a levantar).

### 1.1.4 Design system

- Para este proyecto se decidió utilizar [PrimeNG](https://primeng.org), priorizar siempre el uso de los componentes que dispone este design system. Nota: Solo utilizar componentes personalizados para casos demasiado especificos.

### 1.1.5 Iconos

- Los iconos utilizados en este proyecto son los que disponse [PrimeNg Icons](https://primeng.org/icons), priorizar siempre el uso de estos iconos salvo casos especificos como por ejemplo logos de marcas.

### 1.1.6 Estilos

- Para el manejo de estilos personalizados se decidió utilizar [tailwind](https://tailwindcss.com/docs). Tratar de no utilizar clases muy especificas en los scss de los componentes y si las clases de tailwind. Para los colores, podes ver la paleta que ya brinda de tailwind [acá](https://tailwindcss.com/docs/colors).

## 1.2. Arquitectura

El directorio del proyecto se maneja de la siguiente manera:

``` text
/apps
|_ /shell => aplicacion host que contiene a todos los remotes.
|_ /remotes... => todas las demas aplicaciones que son consumidas por shell.
|        |_ /core
|        |       |_ /guards => Contiene los guards que implementan las rutas.
```

## 1.3. Crear nueva app remote

### 1.3.1. Comando principal

> Aclaración: Siempre que veas `[remoteName]` es el nombre que seleccionaste para tu app remote.

Crear un nuevo remote con el siguiente comando reemplazando `[remoteName]` por el nombre que desees. Tener en cuenta que el nombre solo puede ser separado con guiones bajos y siempre debe estar dentro de la carpeta `apps`.

```sh
  nx g @nx/angular:remote apps/[remoteName] --standalone --style=scss --unitTestRunner=none --e2eTestRunner=none
```

> Crear el remote de esta manera con `--standalone` ya que sino fallará. Esto es debido a que el host `shel` no dispone del directorio original que crea normalmente Nx.

### 1.3.2. Configuración inicial

1. Buscar el archivo de module federation de shell (host) `apps/shell/module-federation.config.ts` y dentro de la propiedad `remotes` agregar el `[remoteName]`.
2. Agregar la ruta donde sea necesario, normalmente será dentro de `apps/shell/src/app/layouts/logged/logged-layout-routes.ts` (Usar siempre loadChildren). La ruta donde se debe apuntar es el path que fue creado por Nx en `tsconfig.base.json` especificamente en la propiedad `paths` del json.
3. En el nuevo directorio `apps/[remoteName]` hacer lo siguiente:

   - Mover la logica necesaria para el serve (appRoutes, appConfig, bootstrapApplication) dentro del archivo `apps/[remoteName]/src/bootstrap.ts`.
   - En `apps/[remoteName]/src/app` crear tres archivos principales `(*1)`:
     - `remote-name-root.ts` => Logica del componente principal del remote `(*2)`.
     - `remote-name-root.html` => Vista del componente principal del remote.
     - `remote-name-root-routes.ts` => Exports de las rutas del remote.
     - Modicar el archivo `apps/[remoteName]/module-federation.config.ts`, chequeando que la propiedad `exposes` apunte correctamente al routes creado anteriormente (quedando algo como `apps/[remoteName]/src/app/[remoteName]-root-routes.ts`).
     - Modificar el archivo `app/[remoteName]/tsconfig.app.json`, chequeando que la propiedad `files` apunte correctamente al routes creado anteriormente (quedando algo como `src/app/authorizations-root-routes.ts`).

    > (*1): Chequear el remote `monitoring` para tener un ejemplo de como debe quedar todo esto.
    > (*2): En caso de necesitar utilizar `<router-outlet/>` dentro del remote, obligatoriamente se debe agregar el input `name`. Esto es para salvar un problema de doble [vista que pasa con Nx](https://github.com/nrwl/nx/issues/14551). Debería quedar algo como `<router-outlet [name]="'[remoteName]-outlet'" />`.

4. Ejecutar el comando `nx build [remoteName]` para chequear que qeudó ok el nuevo remote.
5. Ejecutar el comando `nx build shell` para chquear que no rompe nada del shell.
6. Agregar script en el package.json del root para poder correr los scripts `standalone` y `build`.

> Seguramente necesites cargar en `apps/shell/src/app/layouts/logged/logged-layout-routes.ts` la nueva ruta para acceder al remote, asi como tambien en `apps/shell/src/app/routes/dashboard/dashboard.html` el link para acceder a la ruta.

## 1.4. Buenas prácticas

### 1.4.1. Directiva CustomStyles

Todos los componentes shared que sean de tipo UI, extienden (o deberían) de CustomStyles. La directiva se encarga de agregar los inputs (y bindearlos) admClasses y admStyles. El componente UI deberá implementarlas obligatoriamente para que se pueda modificar de cualquier componente que los implemente.

``` text
NOTA: Tambien se puede bindear estilos con las nuevas clases generales de cada componente UI.
```

### 1.4.2. Manejo de estilos

Tener en cuenta esto para los estilos:

- Chequear siempre las clases de tailwind e intentar utilizar estas con prioridad 1.
- Utilizar unicamente la nomenclatura de colores de tailwind ([Colors - Core concepts - Tailwind CSS](https://tailwindcss.com/docs/colors)). Esto esta hablado con el equipo de diseño, en caso de necesitar hacer override.
- Los overrides de los colores o variables en `tailwind-overrides.css` en la directiva @theme.
- Las variables o estilos sin tailwind globales NO referidos a tailwind van `general.scss` o `variables.scss` respectivamente.
- Las clases globales que implementan clases de tailwind van en el `@layer components`.
- Las clases globales que son nuestras van en el `@layer utilities`.
- Ahora tenemos las clases para tablas, form-control, absolute-full y flex-center para utilizar globalmente, se pueden ver en `tailwind-overrides.css`.
- Para todas las clases nuestras que creemos (tanto globales como de componente) deben llevar de manera obligatoria el prefijo `adm-`.
- Esta prohibido el uso de :ng-deep.

### 1.4.3. Reemplazo de ng-deep

No utilizar ng-deep porque se va a deprecar. Para las clases que necesitemos modificar a nuestros child directamente desde un componente hay que hacer lo siguiente:

- Crear una clase en el componente que lo necesita, y dentro de esta que modifique lo que necesitemos cambiar de sus child.
- Modificar la encapsulacion del componente con encapsulation: ViewEncapsulation.None.

``` text
NOTA: Tené en cuenta que esto modifica a todos los componentes que usen esa clase. Por lo que hay que tener en cuenta que no afecte a ningun otro componente (por eso se modifica todo dentro de una clase).
NOTA2: Pensar si primero no se puede hacer con los inputs de la directiva CustomStyles, sino usar esta opcion.
```

### 1.4.4. Z-Index

El proyecto utiliza 5 capas especificas con las que diferenciar el index de los componentes. Solo utilizar en casos especficos y necesarios por algun motivo, caso contrario no agregar. No se aceptarán z-index agregados manualmente.

- z-50 ==> AlertService (Componentes alertas y toast).
- z-40 ==> ModalService (Componente modal)
- z-30 ==> Vistas que necesiten prioridad 1.
- z-20 ==> Vistas que necesiten prioridad 2.
- z-10 ==> (Mas usado) Vistas que necesiten destacar por algun tema en particular.
