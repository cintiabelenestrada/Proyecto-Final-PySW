# Grupo 10

**Integrantes**:
- Alavar Ariel Ezequiel- LU: 5015
- Estrada Cintia Belen - LU: 3435
- García Mateo Valentin - LU: 4941
- Meneghini Enzo Nicolas- LU: 4732
- Rosero Rosero Johan Cristhian - LU:5221
- Vídal Darío Rubén- LU: 4956

# Proyecto-Final-PySW
Proyecto Final en el cual se realizará la administración de una galería comercial que alquila locales comerciales a diferentes propietarios. Al mismo acceden los propietarios, Administrativos y el Dueño. Se aplicará todas las tecnologías vistas en la matería: HTML, CSS, BOOTSTRAP, ANGULAR, TYPESCRIPT, NODE.JS, EXPRESS, MONGO para el desarrollo de un sistema.
A continuación, se muestran un esquema de datos para el ejercicio planteado:

**Propietario:**
- id: number
- apellido: String
- nombres: String
- dni: number
- email: String
- teléfono number
  
**Local:**
- id: number
- superficie: number
- habilitado: boolean
- costomes: number
- pathimagen: string
- alquilado: boolean
  
**Alquiler:**
- id: number
- propietario: Propietario
- local: Local
- plazomes: number
- costoalquiler: number
- fechaAlquiler: date
  
**Usuario:**
- id:number
- email: string
- usuario: string
- password: string
- activo: boolean
- perfil: string (administrativo, propietario)
  
**Novedades:**
- Id: number
- Usuario: Usuario
- Texto: string
- estado: string (pendiente-procesado)

**Actividades:**
1- Realice la gestión de los CRUD de todas las entidades de que contemple el modelo elegido, a los cuales tendrán acceso solo usuario “administrativos”.

2- Realice la gestión de los CRUD de las entidades Usuario, se habilita solo el acceso a esta operación a los usuarios de tipo “dueño”.

3- Se accede a la aplicación mediante el uso de credenciales de acceso, el menú será adaptable al tipo de usuario que ingresa, en el caso de los dueños pueden acceder a todas las posibilidades del mismo.

4- Buscador/filtro en diferentes entidades (ej. de alquileres histórico por año).

5- La página principal del sitio muestra imágenes de los locales comerciales que se pueden alquilar para que el visitante al sitio tenga más información de los mismos.

6- Las novedades son ingresadas por los usuarios de tipo “administrativo” y tienen relación a observaciones que hacen los propietarios durante el transcurso del alquiler, (ej. Rotura de cañería d agua, etc.). Los cuales serán gestionados luego por el administrativo o dueño.

7- Realizar los pagos mensualse de los alquileres de los locales.

8- El dueño en un panel de control puede ver información estadística como ser los pagos por mes, local, totales. (utilizar herramienta de graficos para mostrar información).

9- Los propietarios cuando ingresen pueden ver sus pagos realizados. 

10-Los pagos se pueden realizar por diferentes medios, al realizar el mismo se genera un cupón de pago con un QR que identifica el pago. (con alguna API de mercado pago).

11- Los pagos pueden tener un registro de Adelantos, una cuota se considera saldada si las sumas de los adelantos hacen al monto de la cuota. Una cuota no puede ser abonada si no se ha abonado la cuota anterior.

12- Los propietarios pueden dar de alta ofertas o promociones (periodo desde-hasta) que serán vistas en el home de la aplicación.

13- El público en general podrá acceder a la aplicación y observar los posteos de promociones que realizan los propietarios y otra información que se considere útil para los visitantes.

14- Los propietarios de los locales pueden postear en la Red Social (Facebook, twiter, etc) de la Galeria Comercial las promociones.

15- Aplicar a elección del grupo una API existente en el ecosistema web que se adapte al contexto del enunciado y que pueda darle una funcionalidad distintiva.

**Notas sobre el Repositorio**

| Branch             | Information                                                                  |
| ------------------ | ---------------------------------------------------------------------------- |
| main               | El proyecto finalizado se guarda en esta rama                                |
| develop            | El desarrolo del proyecto se almacena aqui antes de ser enviado a `main`     |
| branch\_{_nombre_} | Multiples ramas derivadas de `develop` usadas por los integrantes del equipo |
| branch\_{_nombre_}_{_tarea_} | Multiples ramas usadas para realizar tareas por los integrantes del equipo |
