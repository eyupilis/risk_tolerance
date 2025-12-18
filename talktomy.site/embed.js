(function () {
  const scriptTag = document.currentScript;
  const websiteId = scriptTag?.getAttribute("data-website-id");
  const color = scriptTag?.getAttribute("data-color") || "blue"; // Default color
  const icon = scriptTag?.getAttribute("data-icon") || "icon1";
  const lang = scriptTag?.getAttribute("data-lang") || "en";

  // Create chat container
  const chatContainer = document.createElement("div");
  chatContainer.style.position = "fixed";
  chatContainer.style.bottom = "82px";
  chatContainer.style.right = "16px";
  chatContainer.style.width = "400px"; // Default width for desktop
  chatContainer.style.minHeight = "496px";
  chatContainer.style.height = "496px"; // Start with minimum height
  chatContainer.style.borderRadius = "8px";
  chatContainer.style.overflow = "hidden";
  chatContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  chatContainer.style.transition = "all 0.3s ease-in-out";
  chatContainer.style.opacity = "0";
  chatContainer.style.transform = "translateY(100%)";
  chatContainer.style.pointerEvents = "none";
  chatContainer.style.backgroundColor = "white";
  chatContainer.style.border = "1px solid rgb(226, 232, 240)";
  chatContainer.style.zIndex = "100000";

  // Add media query for mobile responsiveness
  const mediaQuery = window.matchMedia("(max-width: 640px)");

  function handleMobileStyles(e) {
    if (e.matches) {
      // Mobile styles
      chatContainer.style.width = "calc(100% - 32px)"; // Full width minus 32px for 16px padding on each side
      chatContainer.style.left = "16px";
      chatContainer.style.right = "16px";
    } else {
      // Desktop styles
      chatContainer.style.width = "400px";
      chatContainer.style.left = "auto";
      chatContainer.style.right = "16px";
    }
  }

  // Initial check
  handleMobileStyles(mediaQuery);

  // Add listener for screen size changes
  mediaQuery.addListener(handleMobileStyles);

  // Create iframe for chat
  const iframe = document.createElement("iframe");
  // iframe.src = `http://localhost:3000/chat?id=${websiteId}&lang=${lang}`;
  iframe.src = `https://talktomy.site/chat?id=${websiteId}&lang=${lang}`;
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.style.border = "none";
  iframe.style.overflow = "hidden";

  // Append only the iframe container to chat container
  chatContainer.appendChild(iframe);

  // Create toggle button
  const toggleButton = document.createElement("button");
  toggleButton.style.position = "fixed";
  toggleButton.style.bottom = "14px";
  toggleButton.style.right = "14px";
  toggleButton.style.backgroundColor = color;
  toggleButton.style.color = "white";
  toggleButton.style.borderRadius = "50%";
  toggleButton.style.width = "50px";
  toggleButton.style.height = "50px";
  toggleButton.style.border = "none";
  toggleButton.style.cursor = "pointer";
  toggleButton.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
  toggleButton.style.transition = "background-color 0.3s ease";
  toggleButton.style.display = "flex";
  toggleButton.style.alignItems = "center";
  toggleButton.style.justifyContent = "center";
  toggleButton.style.zIndex = "100001";
  toggleButton.innerHTML = `<img src="https://talktomy.site/icons/${icon}.svg" alt="Chat Icon" style="width: 24px; height: 24px;" />`;

  let isChatOpen = false;

  // Add click event to toggle button to open/close chat window
  toggleButton.addEventListener("click", function () {
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
      chatContainer.style.opacity = "1";
      chatContainer.style.transform = "translateY(0)";
      chatContainer.style.pointerEvents = "auto";
    } else {
      chatContainer.style.opacity = "0";
      chatContainer.style.transform = "translateY(100%)";
      chatContainer.style.pointerEvents = "none";
    }
  });

  // Add hover effect to the button
  toggleButton.addEventListener("mouseover", function () {
    this.style.backgroundColor = darkenColor(color, 20);
  });

  toggleButton.addEventListener("mouseout", function () {
    this.style.backgroundColor = color;
  });

  // Append elements to the body
  document.body.appendChild(chatContainer);
  document.body.appendChild(toggleButton);

  // Helper function to darken a color
  function darkenColor(color, percent) {
    var num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) - amt,
      G = ((num >> 8) & 0x00ff) - amt,
      B = (num & 0x0000ff) - amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  // Remove close button click event and instead expose a close function
  function closeChatPopup() {
    isChatOpen = false;
    chatContainer.style.opacity = "0";
    chatContainer.style.transform = "translateY(100%)";
    chatContainer.style.pointerEvents = "none";
  }
  window.closeChatPopup = closeChatPopup;

  window.addEventListener("message", function (event) {
    // Optionally, check event.origin for security
    if (event.data && event.data.type === "CLOSE_CHAT_POPUP") {
      closeChatPopup();
    }

    // Handle iframe height updates
    if (event.data && event.data.type === "IFRAME_HEIGHT_UPDATE") {
      const newHeight = Math.max(496, event.data.height); // Ensure minimum 496px
      chatContainer.style.height = newHeight + "px";
    }
  });
})();
