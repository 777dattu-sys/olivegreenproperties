document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("propertyDetailsContainer");
  if (!container) return;

  // Get ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = parseInt(urlParams.get("id"));

  // Find property
  const property = propertiesList.find((p) => p.id === propertyId);

  if (!property) {
    container.innerHTML = `
            <section class="section">
                <div class="container" style="text-align: center; padding: 100px 0;">
                    <h2>Property Not Found</h2>
                    <p>The property you are looking for does not exist.</p>
                    <a href="index.html#properties" class="btn btn-primary" style="margin-top: 20px;">Explore Other Properties</a>
                </div>
            </section>
        `;
    return;
  }

  // Generate Gallery HTML
  const galleryHTML = property.gallery
    .map(
      (img, index) => `
        <div class="gallery-img ${index === 0 ? "active" : ""}">
            <img src="${img}" alt="${property.title} image ${index + 1}" loading="lazy" onclick="changeMainImage('${img}')">
        </div>
    `,
    )
    .join("");

  // Generate Features HTML
  const featuresHTML = property.features
    .map((f) => `<li><i class="fa-solid fa-check-circle"></i> ${f}</li>`)
    .join("");

  const html = `
        <!-- Page Header -->
        <div class="page-header" style="background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${property.image}') center/cover;">
            <div class="container">
                <h1 class="bounce-in">${property.title}</h1>
            </div>
        </div>

        <section class="section bg-light">
            <div class="container">
                <div class="property-details-wrapper">
                    
                    <!-- Left Column: Details -->
                    <div class="details-main fade-in-up">
                        <div class="main-image-container">
                            <img id="mainPropertyImage" src="${property.image}" alt="${property.title}" loading="lazy" ${property.imageStyle ? `style="${property.imageStyle}"` : ""}>
                            ${property.badge ? `<div class="badge">${property.badge}</div>` : ""}
                        </div>
                        <div class="gallery-thumbs">
                            ${galleryHTML}
                        </div>

                        <div class="details-card">
                            <h2>Overview</h2>
                            <p class="property-location" style="color: var(--secondary-color); font-weight: 600; font-size: 1.1rem; margin-bottom: 5px;"><i class="fa-solid fa-location-dot"></i> ${property.location}</p>
                            <p class="price-tag">${property.price}</p>
                            <div class="description">
                                <p>${property.detailedDescription}</p>
                            </div>

                            <h3 class="features-title">Property Highlights</h3>
                            <ul class="features-grid">
                                ${featuresHTML}
                            </ul>
                        </div>
                    </div>

                    <!-- Right Column: Sidebar -->
                    <div class="details-sidebar slide-in-right">
                        <div class="sidebar-agent">
                            <img src="expert-photo.jpg.png" alt="Agent" class="sidebar-agent-img">
                            <h3>D. Ramakrishna Reddy</h3>
                            <p>Lead Property Consultant</p>
                            <p class="agent-trust-badge"><i class="fa-solid fa-shield-halved"></i> 100% Verified By Expert</p>
                            
                            <form class="sidebar-form" onsubmit="event.preventDefault(); alert('Request captured! We will contact you soon.');">
                                <h4>Request Details</h4>
                                <input type="text" placeholder="Your Name" required>
                                <input type="tel" placeholder="Phone Number" required>
                                <button type="submit" class="btn btn-primary btn-block">Get Full Details</button>
                            </form>

                            <div class="sidebar-ctas">
                                <a href="tel:+917842007299" class="btn btn-outline btn-block"><i class="fa-solid fa-phone"></i> Call Now</a>
                                <a href="https://wa.me/917842007299?text=I'm%20interested%20in%20${encodeURIComponent(property.title)}" class="btn btn-gold btn-block" target="_blank"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    `;

  container.innerHTML = html;

  // Add animations since they are generated after DOM load
  const elementsToAnimate = container.querySelectorAll(
    ".fade-in-up, .slide-in-right, .bounce-in",
  );
  elementsToAnimate.forEach((el) => {
    el.style.animationPlayState = "running";
    el.style.opacity = "1";
  });
});

window.changeMainImage = function (src) {
  document.getElementById("mainPropertyImage").src = src;
};
