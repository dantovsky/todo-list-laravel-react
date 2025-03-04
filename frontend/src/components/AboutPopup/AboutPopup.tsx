import React, { useState } from 'react';
import './AboutPopup.css';

const AboutPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openPopup}>Sobre este Projeto</button>

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Sobre o Projeto</h2>
            <p>
              Esta aplicação foi construída com uma API em Laravel e um front-end
              em React (usando TypeScript), projetada para funcionar num plano de
              alojamento web partilhado.
            </p>
            <button onClick={closePopup}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPopup;
