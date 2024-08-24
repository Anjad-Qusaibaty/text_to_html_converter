let generatedHTML = "";
let comma;

// Set default author and comma based on selected language
function setDefaultAuthor() {
  const language = document.getElementById("language").value;
  const authorField = document.getElementById("author");
  if (language === "en") {
    authorField.value = "Anjad Qusaibaty";
    comma = ", ";
  } else if (language === "ar") {
    authorField.value = "أنجاد قصيباتي";
    comma = " ،";
  }
}

// Show custom country/city input fields if 'Other' is selected
document.getElementById("country").addEventListener("change", function () {
  const countryOther = document.getElementById("countryOther");
  countryOther.classList.toggle("hidden", this.value !== "Other");
});

document.getElementById("city").addEventListener("change", function () {
  const cityOther = document.getElementById("cityOther");
  cityOther.classList.toggle("hidden", this.value !== "Other");
});

// Handle convert button click
document.getElementById("convertBtn").addEventListener("click", function () {
  const text = document.getElementById("text").value.trim();
  if (text) {
    // Get the selected or custom country and city
    const country =
      document.getElementById("country").value === "Other"
        ? document.getElementById("countryOther").value.trim()
        : document.getElementById("country").value;
    const city =
      document.getElementById("city").value === "Other"
        ? document.getElementById("cityOther").value.trim()
        : document.getElementById("city").value;

    // Get other form data
    const author = document.getElementById("author").value;
    const date = document.getElementById("date").value;
    const language = document.getElementById("language").value;

    // Convert text to HTML (each line wrapped in <p> tags)
    const lines = text.split(/\n\s*\n/); // Splitting text on empty lines for paragraph separation
    generatedHTML =
      '<!DOCTYPE html><html lang="' +
      language +
      '"><head><meta charset="UTF-8">';
    generatedHTML +=
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    generatedHTML +=
      "<style>body { direction: " +
      (language === "ar" ? "rtl" : "ltr") +
      "; font-family: Arial, sans-serif; line-height: 1.6; background-color: #f5f5f5; color: #333; }";
    generatedHTML +=
      ".container { max-width: 800px; margin: 0 auto; background: #fff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }";
    generatedHTML +=
      "p { margin-bottom: 15px; text-align: justify; }</style></head><body>";
    generatedHTML += '<div class="container">';

    lines.forEach((line) => {
      const paragraphs = line
        .split(/\n/)
        .map((l) => l.trim())
        .filter((l) => l);
      paragraphs.forEach((paragraph) => {
        generatedHTML += "<p>" + paragraph + "</p>";
      });
    });

    // Footer
    generatedHTML += "<hr />";
    generatedHTML += "<p>" + author + "</p>";
    generatedHTML +=
      "<p>" +
      (country ? country + comma : "") +
      (city ? city + comma : "") +
      (date || "") +
      "</p>";
    generatedHTML += "</div></body></html>";

    // Show preview and download buttons after conversion
    document.getElementById("previewBtn").classList.remove("hidden");
    document.getElementById("downloadBtn").classList.remove("hidden");
  }
});

// Preview the generated HTML in a new tab
document.getElementById("previewBtn").addEventListener("click", function () {
  const newWindow = window.open();
  newWindow.document.write(generatedHTML);
});

// Download the generated HTML as a file
document.getElementById("downloadBtn").addEventListener("click", function () {
  const title =
    document.getElementById("title").value.trim().replace(/\s+/g, "_") ||
    "text2html";
  const blob = new Blob([generatedHTML], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = title + ".html";
  link.click();
});

// Initialize default author and comma
document
  .getElementById("language")
  .addEventListener("change", setDefaultAuthor);
document.addEventListener("DOMContentLoaded", setDefaultAuthor);
