// Preloader Management System
class PreloaderManager {
    constructor() {
        this.loader = document.querySelector(".loader");
        this.isLoading = false;
        this.loadingQueue = 0;
        this.init();
    }

    init() {
        // Show loader on page load
        this.show();
        
        // Listen for page load completion
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hide();
            }, 1000);
        });

        // Listen for navigation events
        this.setupNavigationListeners();
        
        // Listen for AJAX requests
        this.setupAjaxListeners();
        
        // Listen for image loading
        this.setupImageListeners();
    }

    show() {
        if (this.loader && !this.isLoading) {
            this.isLoading = true;
            this.loadingQueue++;
            this.loader.style.display = 'flex';
            gsap.to(this.loader, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }

    hide() {
        if (this.loader && this.isLoading) {
            this.loadingQueue--;
            if (this.loadingQueue <= 0) {
                this.loadingQueue = 0;
                this.isLoading = false;
                gsap.to(this.loader, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => {
                        this.loader.style.display = 'none';
                    }
                });
            }
        }
    }

    setupNavigationListeners() {
        // Listen for link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && !link.href.startsWith('javascript:') && !link.href.startsWith('#')) {
                const href = link.href;
                const currentOrigin = window.location.origin;
                
                // Only show loader for same-origin navigation
                if (href.startsWith(currentOrigin) || href.startsWith('/')) {
                    this.show();
                }
            }
        });

        // Listen for browser back/forward
        window.addEventListener('popstate', () => {
            this.show();
        });

        // Listen for beforeunload
        window.addEventListener('beforeunload', () => {
            this.show();
        });
    }

    setupAjaxListeners() {
        // Override fetch
        const originalFetch = window.fetch;
        window.fetch = (...args) => {
            this.show();
            return originalFetch(...args)
                .finally(() => {
                    setTimeout(() => this.hide(), 500);
                });
        };

        // Override XMLHttpRequest
        const originalXHROpen = XMLHttpRequest.prototype.open;
        const originalXHRSend = XMLHttpRequest.prototype.send;
        
        XMLHttpRequest.prototype.open = function(...args) {
            this._isAjaxRequest = true;
            return originalXHROpen.apply(this, args);
        };
        
        XMLHttpRequest.prototype.send = function(...args) {
            if (this._isAjaxRequest) {
                window.preloaderManager.show();
                this.addEventListener('loadend', () => {
                    setTimeout(() => window.preloaderManager.hide(), 500);
                });
            }
            return originalXHRSend.apply(this, args);
        };
    }

    setupImageListeners() {
        // Track image loading
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        const totalImages = images.length;

        if (totalImages > 0) {
            images.forEach(img => {
                if (img.complete) {
                    loadedImages++;
                } else {
                    img.addEventListener('load', () => {
                        loadedImages++;
                        if (loadedImages === totalImages) {
                            setTimeout(() => this.hide(), 300);
                        }
                    });
                    img.addEventListener('error', () => {
                        loadedImages++;
                        if (loadedImages === totalImages) {
                            setTimeout(() => this.hide(), 300);
                        }
                    });
                }
            });
        }
    }

    // Method to manually show/hide loader
    setLoading(loading) {
        if (loading) {
            this.show();
        } else {
            this.hide();
        }
    }
}

//create loader animations

const liquidFront = document.querySelector(".liquidFront");
const liquidBack = document.querySelector(".liquidBack");
const bubble0 = document.querySelector(".bubble0");
const bubble1 = document.querySelector(".bubble1");
const bubble2 = document.querySelector(".bubble2");
const bubble3 = document.querySelector(".bubble3");
const bubble4 = document.querySelector(".bubble4");
const darkBubble = document.querySelectorAll(".darkBubble");
const bubblePop0 = document.querySelector(".bubblePop0");
const bubblePop1 = document.querySelector(".bubblePop1");

const liquidMaskGroup = document.querySelector(".liquidMaskGroup");

const bubblePop2 = document.querySelector(".bubblePop2");
const pop = document.querySelector(".pop");

var isDevice = /android|webos|iphone|ipad,ipodblackberry/i.test(
  navigator.userAgent.toLocaleLowerCase()
);

//create same pop on liquidMaskGroup
var pop1 = pop.cloneNode(true);
var pop2 = pop.cloneNode(true);

liquidMaskGroup.appendChild(pop1);
liquidMaskGroup.appendChild(pop2);

var mainTimeline = gsap.timeline();

var frontLiquidTimeline = gsap.timeline({
  repeat: -1,
});

frontLiquidTimeline.to(liquidFront, 3, {
  x: -600,
  ease: Linear.easeNone,
});

var backLiquidTimeline = gsap.timeline({
  repeat: -1,
  delay: 0,
  repeatDelay: 2,
});

backLiquidTimeline.to(liquidBack, 3, {
  x: -800,
  ease: Linear.easeNone,
});

var b0 = gsap.timeline({
  repeat: -1,
  onRepeat: doRepeat,
  onRepeatParams: [bubble0],
});
b0.timeScale(1.3);
b0.to(bubble0, 0.8, {
  attr: {
    cy: "-=80",
  },
  ease: Sine.easeIn,
}).to(bubble0, 1, {
  attr: {
    cy: "+=80",
  },
  ease: Sine.easeIn,
});

var b1 = gsap.timeline({
  repeat: -1,
  delay: 3,
  repeatDelay: 5,
  onRepeat: doRepeat,
  onRepeatParams: [bubble1],
});
b1.timeScale(1)
  .to(bubble1, 0.7, {
    attr: {
      cy: "-=120",
    },
    ease: Linear.easeNone,
  })
  .to(bubble1, 0.7, {
    attr: {
      cy: "+=120",
    },
    ease: Linear.easeNone,
  });

var b2 = gsap.timeline({
  repeat: -1,
  delay: 1,
  repeatDelay: 6,
  onRepeat: doRepeat,
  onRepeatParams: [bubble2],
});
b2.timeScale(1);

b1.to(bubble2, 0.7, {
  attr: {
    cy: "-=70",
  },
  ease: Linear.easeNone,
}).to(bubble2, 0.7, {
  attr: {
    cy: "+=70",
  },
  ease: Linear.easeNone,
});

var b3 = gsap.timeline({
  repeat: -1,
  delay: 1,
  repeatDelay: 4,
  onRepeat: doRepeat,
  onRepeatParams: [bubble3],
});
b3.timeScale(1);
b3.to(bubble3, 0.72, {
  attr: {
    cy: "-=140",
  },
  ease: Sine.easeOut,
})
  .to(bubble3, 0.72, {
    attr: {
      cy: "+=140",
    },
    ease: Sine.easeIn,
  })
  .to(bubble3, 0.88, {
    attr: {
      cy: "-=130",
    },
    ease: Sine.easeOut,
  })
  .to(bubble3, 0.88, {
    attr: {
      cy: "+=130",
    },
    ease: Sine.easeIn,
  });

var b4 = gsap.timeline({
  repeat: -1,
  delay: 1,
  repeatDelay: 4,
  onRepeat: doRepeat,
  onRepeatParams: [bubble4],
});

b4.timeScale(1);
b4.to(bubble4, 0.88, {
  attr: {
    cy: "-=99",
  },
  ease: Sine.easeIn,
}).to(bubble4, 0.88, {
  attr: {
    cy: "+=99",
  },
});

//pops

var bPop0 = gsap.timeline({
  repeat: -1,
  delay: 2,
  repeatDelay: 5,
});
bPop0.timeScale(1);
bPop0
  .to(bubblePop0, 0.82, {
    attr: {
      cy: "-=100",
    },
    ease: Sine.easeOut,
  })
  .set(bubblePop0, {
    alpha: 0,
  })
  .set(pop, {
    x: 256,
    y: 269,
    transformOrigin: "50% 50%",
  })
  .from(pop, 0.2, {
    scale: 0,
    transformOrigin: "50% 50%",
  })
  .to(
    pop,
    0.1,
    {
      alpha: 0,
    },
    "-=0.1"
  );

var bPop1 = gsap.timeline({
  repeat: -1,
  delay: 1,
  repeatDelay: 7,
});
bPop1.timeScale(1);

bPop1
  .to(bubblePop1, 0.72, {
    attr: {
      cy: "-=80",
    },
    ease: Sine.easeIn,
  })
  .set(bubblePop1, {
    alpha: 0,
  })
  .set(pop1, {
    x: 310,
    y: 302,
    transformOrigin: "50% 50%",
  })
  .fromTo(
    pop1,
    0.2,
    {
      scale: 0,
    },
    {
      scale: 0.8,
      transformOrigin: "50% 50%",
    }
  )
  .to(
    pop1,
    0.1,
    {
      alpha: 0,
    },
    "-=0.1"
  );

var bPop2 = new TimelineMax({
  repeat: -1,
  delay: 5,
  repeatDelay: 9,
});
bPop2.timeScale(1);
bPop2
  .to(bubblePop2, 0.92, {
    attr: {
      cy: "-=90",
    },
    ease: Sine.easeOut,
  })
  .set(bubblePop2, {
    alpha: 0,
  })
  .set(pop2, {
    x: 346,
    y: 322,
    transformOrigin: "50% 50%",
  })

  .fromTo(
    pop2,
    0.2,
    {
      scale: 0,
    },
    {
      scale: 0.8,
      transformOrigin: "50% 50%",
    }
  )
  .to(
    pop2,
    0.1,
    {
      alpha: 0,
    },
    "-=0.1"
  );

var darkBubble0 = gsap.timeline({
  repeat: -1,
});
darkBubble0.staggerTo(
  darkBubble,
  2,
  {
    attr: {
      cy: 370,
      r: 0,
    },
    fill: "#2E69E2",
    ease: Power3.easeIn,
  },
  0.9
);

mainTimeline
  .add(frontLiquidTimeline, 0)
  .add(backLiquidTimeline, 0)
  .add(b0, 0)
  .add(b1, 0)
  .add(b2, 0)
  .add(b3, 0)
  .add(b4, 0)
  .add(bPop0, 0)
  .add(bPop1, 0)
  .add(bPop2, 0)
  .add(darkBubble0, 0);

mainTimeline.timeScale(1);

//functions to change position repeat bubbles

function doRepeat(bubble) {
  gsap.set(bubble, {
    attr: {
      cx: getBetweenVal(240, 360),
    },
  });
}

function getBetweenVal(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Initialize preloader manager
window.preloaderManager = new PreloaderManager();

// Global function to manually control preloader
window.showPreloader = () => window.preloaderManager.show();
window.hidePreloader = () => window.preloaderManager.hide();
window.setPreloaderLoading = (loading) => window.preloaderManager.setLoading(loading);
