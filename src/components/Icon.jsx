import React, { useEffect, useRef } from 'react';

export default function Icon({ name, className = '', ...props }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && window.lucide) {
      // Crear elemento temporal en memoria para aislar la manipulación de Lucide
      const tempDiv = document.createElement('div');
      const iElement = document.createElement('i');
      iElement.setAttribute('data-lucide', name);
      tempDiv.appendChild(iElement);

      // Reemplazar el elemento <i> por <svg>
      window.lucide.createIcons({
        node: tempDiv
      });

      // Inyectar el HTML interno del elemento transformado de forma segura en nuestro contenedor
      containerRef.current.innerHTML = tempDiv.innerHTML;
    }
  }, [name]);

  // Retornar un contenedor simple que React ve como vacío, evitando fallas de reconciliación
  return (
    <span 
      ref={containerRef} 
      className={`inline-flex items-center justify-center icon-container ${className}`} 
      {...props} 
    />
  );
}
