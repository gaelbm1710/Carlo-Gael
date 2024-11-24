export const getMapScreenshot = async (view) => {
  try {
    const screenshot = await view.takeScreenshot({
      width: 800,
      height: 600,
    });
    return screenshot.dataUrl;
  } catch (error) {
    console.error("Error al tomar captura del mapa:", error);
    return null;
  }
};
