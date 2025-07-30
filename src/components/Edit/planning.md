components/
└── Edit/
    ├── index.tsx               <-- Punto de entrada del componente completo (EditView)
    ├── AppBar.tsx              <-- Reutilizas el componente que ya tienes de appbar
    ├── Form/
    │   ├── index.tsx           <-- Contenedor principal del formulario
    │   ├── controllers/        <-- Lógica de manejo (aún básica, luego puede ser hooks o servicios)
    │   ├── views/              <-- Componentes pequeños por sección del formulario
    │   │   ├── BoardInfo.tsx       (nombre, descripción, imagen)
    │   │   ├── Members.tsx         (miembros, input y listado)
    │   │   ├── Tags.tsx            (etiquetas, input y listado)
    │   │   ├── Visibility.tsx      (público / privado)
    │   │   └── Actions.tsx         (botones de cancelar / guardar)
    │   └── types.ts             <-- Tipado (Member, Tag, FormState, etc.)
_______________________________________________________            _______________________________________________________
_______________________________________________________ARQUITECTURA_______________________________________________________


_______________________________________________________       _______________________________________________________
_______________________________________________________AVANCES_______________________________________________________

-> 