import Image from 'next/image';

export default function ControllerIcons() {
  return (
    <div className="flex space-x-4">
      <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
        <Image src="/assets/icons/discord.png" alt="Discord" width={30} height={30} />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <Image src="/assets/icons/linkedin.png" alt="LinkedIn" width={30} height={30} />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <Image src="/assets/icons/facebook.png" alt="Facebook" width={30} height={30} />
      </a>
    </div>
  );
}