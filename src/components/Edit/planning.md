components/
└── Edit/
    ├── index.tsx               <-- Punto de entrada del componente completo (EditView)
    ├── AppBar.tsx              <-- Aqui llamo a otros componentes que van armando la pagina (Navbar)
    ├── Form/
    │   ├── index.tsx           <-- Contenedor principal del formulario
    │   ├── controllers/        <-- Lógica de manejo (aún básica, puede ser hooks, servicios)
    │   ├── views/              <-- Componentes pequeños por sección del formulario
    │   │   ├── BoardInfo.tsx       (nombre, descripción, imagen)
    │   │   ├── Members.tsx         (miembros, input y listado)
    │   │   ├── Tags.tsx            (etiquetas, input y listado)
    │   │   ├── Visibility.tsx      (público / privado)
    │   │   └── Actions.tsx         (botones de cancelar / guardar)
    │   └── types.ts             <-- Tipado (Member, Tag, FormState, etc.)

