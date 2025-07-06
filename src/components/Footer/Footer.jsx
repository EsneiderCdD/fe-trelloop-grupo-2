import SocialIcons from './ControllerIcons';

export default function Footer() {
  
  return (
    <footer style={{ backgroundColor: '#1A1A1A' }} className="text-white py-10">
      <div className="w-full px-4 grid grid-cols-4 gap-8">

        <div>
          <h4 className="font-bold mb-4">Acerca de</h4>
          <ul className="space-y-2">
            <li>Programa TrainIT</li>
            <li>Contacto</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>Política de cookies</li>
            <li>Política de privacidad</li>
            <li>Aviso legal y condiciones de uso</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Sedes</h4>
          <ul className="space-y-2">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
            <li>Ut enim ad minim veniam, quis nostrud exercitation</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Redes sociales</h4>
          <SocialIcons />
        </div>

      </div>

      <div className="text-center mt-10">
        © 2025 Copyright | Programa TrainIT
      </div>
    </footer>
  );
}
