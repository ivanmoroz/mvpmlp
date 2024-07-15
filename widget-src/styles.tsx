export const styles = {
    padding: 48,
    fill: "#ffffff",
    cornerRadius: 16,
    spacing: 48,
    width: 700,
    effect: [
      { type: "drop-shadow", color: "#0000001a", offset: { x: 0, y: 4 }, blur: 8 }
    ]
  };
  
  export const uncheckedIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#F5F5F5"/>
  </svg>`;
  
  export const checkedIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#FADB14"/>
    <path d="M7 12L10 15L17 8" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  