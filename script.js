const output = document.getElementById("output");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Create loading & error containers dynamically
const loadingDiv = document.createElement("div");
loadingDiv.id = "loading";
loadingDiv.textContent = "Loading...";

const errorDiv = document.createElement("div");
errorDiv.id = "error";
errorDiv.style.color = "red";

output.appendChild(loadingDiv);
output.appendChild(errorDiv);

// Download single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);

    img.src = url;
  });
}

// Download all images
async function downloadImages() {
  loadingDiv.style.display = "block";
  errorDiv.textContent = "";

  try {
    const imagePromises = images.map(img =>
      downloadImage(img.url)
    );

    const loadedImages = await Promise.all(imagePromises);

    // Clear output before appending images
    output.innerHTML = "";

    loadedImages.forEach(img => {
      output.appendChild(img);
    });

  } catch (error) {
    loadingDiv.style.display = "none";
    errorDiv.textContent = error;
  }
}

// Start download 
downloadImages();
