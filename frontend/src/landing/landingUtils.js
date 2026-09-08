/**
 * Utility to load landing vendor scripts and initialize all interactive components
 * (Swiper carousels, Slick sliders, accordions, mobile menu, sticky header, etc.)
 * across all React landing pages.
 */

const SCRIPT_URLS = [
  '/assets/js/vendors/jquery-3.7.1.min.js',
  '/assets/js/vendors/bootstrap.bundle.min.js',
  '/assets/js/vendors/slick.js',
  '/assets/js/vendors/swiper-bundle.min.js',
  '/assets/js/vendors/glightbox.min.js',
  '/assets/js/vendors/isotope.js',
  '/assets/js/vendors/images-loaded.js',
  '/assets/js/vendors/jquery.countdown.min.js',
];

const loadScript = (src) => {
  return new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.getAttribute('data-loaded') === 'true') {
        return resolve();
      }
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => resolve());
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = () => {
      script.setAttribute('data-loaded', 'true');
      resolve();
    };
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });
};

export const loadLandingVendorScripts = async () => {
  for (const src of SCRIPT_URLS) {
    await loadScript(src);
  }
};

export const initLandingInteractions = () => {
  const $ = window.jQuery;
  const Swiper = window.Swiper;

  // ==========================================
  // 1. SWIPER CAROUSELS INITIALIZATION
  // ==========================================
  if (Swiper) {
    try {
      // 1.1 Shop by Collection (.swiper-4-items) & Products (.swiper-4-products)
      document.querySelectorAll('.swiper-4-items, .swiper-4-products').forEach((el) => {
        if (el.swiper) {
          el.swiper.destroy(true, true);
        }
        const box = el.closest('.box-swiper') || el.parentElement;
        const section = el.closest('section') || box?.parentElement || box;
        const prevBtn = section?.querySelector('.swiper-button-prev-collection') || box?.querySelector('.swiper-button-prev-collection') || box?.querySelector('.swiper-button-prev') || '.swiper-button-prev-collection';
        const nextBtn = section?.querySelector('.swiper-button-next-collection') || box?.querySelector('.swiper-button-next-collection') || box?.querySelector('.swiper-button-next') || '.swiper-button-next-collection';
        const pageBtn = section?.querySelector('.swiper-pagination-collection') || box?.querySelector('.swiper-pagination-collection') || box?.querySelector('.swiper-pagination') || '.swiper-pagination-collection';

        new Swiper(el, {
          spaceBetween: 30,
          slidesPerView: 4,
          slidesPerGroup: 1,
          loop: true,
          loopedSlides: 4,
          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn
          },
          pagination: {
            el: pageBtn,
            clickable: true
          },
          autoplay: {
            delay: 10000,
            disableOnInteraction: false
          },
          breakpoints: {
            1200: { slidesPerView: 4, spaceBetween: 30 },
            992: { slidesPerView: 3, spaceBetween: 24 },
            670: { slidesPerView: 2, spaceBetween: 20 },
            0: { slidesPerView: 1, spaceBetween: 15 }
          }
        });
      });

      // 1.2 Hero Banner & Testimonial Sliders (.swiper-banner)
      document.querySelectorAll('.swiper-banner').forEach((el) => {
        if (el.swiper) {
          el.swiper.destroy(true, true);
        }
        const box = el.closest('.box-swiper') || el.parentElement;
        const section = el.closest('section') || el.closest('.box-banner-homepage4') || box?.parentElement || box;
        const prevBtn = section?.querySelector('.swiper-button-prev-banner') || section?.querySelector('.swiper-button-prev') || box?.querySelector('.swiper-button-prev-banner') || box?.querySelector('.swiper-button-prev') || '.swiper-button-prev-banner';
        const nextBtn = section?.querySelector('.swiper-button-next-banner') || section?.querySelector('.swiper-button-next') || box?.querySelector('.swiper-button-next-banner') || box?.querySelector('.swiper-button-next') || '.swiper-button-next-banner';
        const pageBtn = section?.querySelector('.swiper-pagination-banner') || section?.querySelector('.swiper-pagination') || box?.querySelector('.swiper-pagination-banner') || box?.querySelector('.swiper-pagination') || '.swiper-pagination-banner';

        new Swiper(el, {
          slidesPerView: 1,
          loop: true,
          observer: true,
          observeParents: true,
          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn
          },
          pagination: {
            el: pageBtn,
            clickable: true
          },
          autoplay: {
            delay: 8000,
            disableOnInteraction: false
          }
        });
      });

      // 1.3 Swiper 6 Items (.swiper-6-items)
      document.querySelectorAll('.swiper-6-items').forEach((el) => {
        if (el.swiper) {
          el.swiper.destroy(true, true);
        }
        const box = el.closest('.box-swiper') || el.parentElement;
        const section = el.closest('section') || box?.parentElement || box;
        const prevBtn = section?.querySelector('.swiper-button-prev-6') || box?.querySelector('.swiper-button-prev-6') || '.swiper-button-prev-6';
        const nextBtn = section?.querySelector('.swiper-button-next-6') || box?.querySelector('.swiper-button-next-6') || '.swiper-button-next-6';
        const pageBtn = section?.querySelector('.swiper-pagination-6') || box?.querySelector('.swiper-pagination-6') || '.swiper-pagination-6';

        new Swiper(el, {
          spaceBetween: 30,
          slidesPerView: 6,
          slidesPerGroup: 1,
          loop: true,
          loopedSlides: 6,
          observer: true,
          observeParents: true,
          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn
          },
          pagination: {
            el: pageBtn,
            clickable: true
          },
          breakpoints: {
            1399: { slidesPerView: 6, spaceBetween: 30 },
            992: { slidesPerView: 4, spaceBetween: 24 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            480: { slidesPerView: 2, spaceBetween: 15 },
            0: { slidesPerView: 1, spaceBetween: 15 }
          }
        });
      });

      // 1.4 Swiper 3 Items (.swiper-3-items)
      document.querySelectorAll('.swiper-3-items').forEach((el) => {
        if (el.swiper) {
          el.swiper.destroy(true, true);
        }
        const box = el.closest('.box-swiper') || el.parentElement;
        const section = el.closest('section') || box?.parentElement || box;
        const prevBtn = section?.querySelector('.swiper-button-prev-items-3') || box?.querySelector('.swiper-button-prev-items-3') || '.swiper-button-prev-items-3';
        const nextBtn = section?.querySelector('.swiper-button-next-items-3') || box?.querySelector('.swiper-button-next-items-3') || '.swiper-button-next-items-3';
        const pageBtn = section?.querySelector('.swiper-pagination-items-3') || box?.querySelector('.swiper-pagination-items-3') || '.swiper-pagination-items-3';

        new Swiper(el, {
          spaceBetween: 30,
          slidesPerView: 3,
          slidesPerGroup: 1,
          loop: true,
          loopedSlides: 3,
          observer: true,
          observeParents: true,
          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn
          },
          pagination: {
            el: pageBtn,
            clickable: true
          },
          breakpoints: {
            1200: { slidesPerView: 3, spaceBetween: 30 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            0: { slidesPerView: 1, spaceBetween: 15 }
          }
        });
      });

      // 1.5 Swiper 2 Items (.swiper-2-items)
      document.querySelectorAll('.swiper-2-items').forEach((el) => {
        if (el.swiper) {
          el.swiper.destroy(true, true);
        }
        const box = el.closest('.box-swiper') || el.parentElement;
        const section = el.closest('section') || box?.parentElement || box;
        const prevBtn = section?.querySelector('.swiper-button-prev-items-2') || box?.querySelector('.swiper-button-prev-items-2') || '.swiper-button-prev-items-2';
        const nextBtn = section?.querySelector('.swiper-button-next-items-2') || box?.querySelector('.swiper-button-next-items-2') || '.swiper-button-next-items-2';
        const pageBtn = section?.querySelector('.swiper-pagination-items-2') || box?.querySelector('.swiper-pagination-items-2') || '.swiper-pagination-items-2';

        new Swiper(el, {
          spaceBetween: 30,
          slidesPerView: 2,
          slidesPerGroup: 1,
          loop: true,
          loopedSlides: 2,
          observer: true,
          observeParents: true,
          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn
          },
          pagination: {
            el: pageBtn,
            clickable: true
          },
          breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 20 },
            0: { slidesPerView: 1, spaceBetween: 15 }
          }
        });
      });

      // 1.6 Swiper 1 Item (.swiper-1-item, .swiper-group-1)
      document.querySelectorAll('.swiper-1-item, .swiper-group-1').forEach((el) => {
        if (el.swiper) {
          el.swiper.destroy(true, true);
        }
        const box = el.closest('.box-swiper') || el.parentElement;
        const section = el.closest('section') || box?.parentElement || box;
        const prevBtn = section?.querySelector('.swiper-button-prev-group-1') || box?.querySelector('.swiper-button-prev-group-1') || '.swiper-button-prev-group-1';
        const nextBtn = section?.querySelector('.swiper-button-next-group-1') || box?.querySelector('.swiper-button-next-group-1') || '.swiper-button-next-group-1';
        const pageBtn = section?.querySelector('.swiper-pagination-group-1') || box?.querySelector('.swiper-pagination-group-1') || '.swiper-pagination-group-1';

        new Swiper(el, {
          slidesPerView: 1,
          loop: true,
          observer: true,
          observeParents: true,
          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn
          },
          pagination: {
            el: pageBtn,
            clickable: true
          }
        });
      });

      // 1.7 Swiper Tab Sliders (.swiper-tab-1 ... .swiper-tab-6)
      for (let idx = 1; idx <= 6; idx++) {
        document.querySelectorAll(`.swiper-tab-${idx}`).forEach((el) => {
          if (el.swiper) {
            el.swiper.destroy(true, true);
          }
          const box = el.closest('.box-swiper') || el.parentElement;
          const section = el.closest('section') || box?.parentElement || box;
          const prevBtn = section?.querySelector(`.swiper-button-prev-tab-${idx}`) || box?.querySelector(`.swiper-button-prev-tab-${idx}`) || `.swiper-button-prev-tab-${idx}`;
          const nextBtn = section?.querySelector(`.swiper-button-next-tab-${idx}`) || box?.querySelector(`.swiper-button-next-tab-${idx}`) || `.swiper-button-next-tab-${idx}`;
          const pageBtn = section?.querySelector(`.swiper-pagination-tab-${idx}`) || box?.querySelector(`.swiper-pagination-tab-${idx}`) || `.swiper-pagination-tab-${idx}`;

          // Support custom data-items (e.g. data-items="3" on Home Living index-10, data-items="5" on Watch Store index-31, data-items="1" on Electronic index-16)
          const tabBtn = document.querySelector(`button[data-index="${idx}"][data-items]`);
          const itemsNum = tabBtn ? parseInt(tabBtn.getAttribute('data-items'), 10) || 4 : 4;

          new Swiper(el, {
            spaceBetween: 30,
            slidesPerView: itemsNum,
            slidesPerGroup: 1,
            loop: true,
            loopedSlides: itemsNum,
            observer: true,
            observeParents: true,
            navigation: {
              nextEl: nextBtn,
              prevEl: prevBtn
            },
            pagination: {
              el: pageBtn,
              clickable: true
            },
            breakpoints: itemsNum > 1 ? {
              1399: { slidesPerView: itemsNum, spaceBetween: 30 },
              1100: { slidesPerView: Math.min(itemsNum, 4), spaceBetween: 24 },
              800: { slidesPerView: Math.min(itemsNum, 3), spaceBetween: 20 },
              575: { slidesPerView: 2, spaceBetween: 15 },
              0: { slidesPerView: 1, spaceBetween: 15 }
            } : {
              0: { slidesPerView: 1, spaceBetween: 30 }
            }
          });
        });
      }

      // 1.8 Swiper Category Group 4 (.swiper-group-4-category - used by index-25)
      document.querySelectorAll('.swiper-group-4-category').forEach((el) => {
        if (el.swiper) {
          el.swiper.destroy(true, true);
        }
        const box = el.closest('.box-swiper') || el.parentElement;
        const section = el.closest('section') || box?.parentElement || box;
        const prevBtn = section?.querySelector('.swiper-button-prev-cat-4') || box?.querySelector('.swiper-button-prev-cat-4') || '.swiper-button-prev-cat-4';
        const nextBtn = section?.querySelector('.swiper-button-next-cat-4') || box?.querySelector('.swiper-button-next-cat-4') || '.swiper-button-next-cat-4';
        const pageBtn = section?.querySelector('.swiper-pagination-cat-4') || box?.querySelector('.swiper-pagination-cat-4') || '.swiper-pagination-cat-4';

        new Swiper(el, {
          spaceBetween: 5,
          slidesPerView: 4,
          slidesPerGroup: 1,
          loop: true,
          observer: true,
          observeParents: true,
          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn
          },
          pagination: {
            el: pageBtn,
            clickable: true
          },
          autoplay: {
            delay: 10000,
            disableOnInteraction: false
          },
          breakpoints: {
            1399: { slidesPerView: 4, spaceBetween: 5 },
            800: { slidesPerView: 3, spaceBetween: 5 },
            500: { slidesPerView: 2, spaceBetween: 5 },
            0: { slidesPerView: 1, spaceBetween: 5 }
          }
        });
      });

      // 1.9 Swiper Group 4 (.swiper-group-4)
      document.querySelectorAll('.swiper-group-4').forEach((el) => {
        if (el.swiper) {
          el.swiper.destroy(true, true);
        }
        const box = el.closest('.box-swiper') || el.parentElement;
        const section = el.closest('section') || box?.parentElement || box;
        const prevBtn = section?.querySelector('.swiper-button-prev-fleet-4') || box?.querySelector('.swiper-button-prev-fleet-4') || '.swiper-button-prev-fleet-4';
        const nextBtn = section?.querySelector('.swiper-button-next-fleet-4') || box?.querySelector('.swiper-button-next-fleet-4') || '.swiper-button-next-fleet-4';
        const pageBtn = section?.querySelector('.swiper-pagination-fleet-4') || box?.querySelector('.swiper-pagination-fleet-4') || '.swiper-pagination-fleet-4';

        new Swiper(el, {
          spaceBetween: 30,
          slidesPerView: 4,
          slidesPerGroup: 1,
          loop: true,
          observer: true,
          observeParents: true,
          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn
          },
          pagination: {
            el: pageBtn,
            clickable: true
          },
          autoplay: {
            delay: 10000,
            disableOnInteraction: false
          },
          breakpoints: {
            1399: { slidesPerView: 4 },
            800: { slidesPerView: 3 },
            500: { slidesPerView: 2 },
            0: { slidesPerView: 1 }
          }
        });
      });

      // 1.10 Swiper Group 5 Items (.swiper-group-5-items)
      document.querySelectorAll('.swiper-group-5-items').forEach((el) => {
        if (el.swiper) {
          el.swiper.destroy(true, true);
        }
        const box = el.closest('.box-swiper') || el.parentElement;
        const section = el.closest('section') || box?.parentElement || box;
        const prevBtn = section?.querySelector('.swiper-button-prev-group-5-items') || box?.querySelector('.swiper-button-prev-group-5-items') || '.swiper-button-prev-group-5-items';
        const nextBtn = section?.querySelector('.swiper-button-next-group-5-items') || box?.querySelector('.swiper-button-next-group-5-items') || '.swiper-button-next-group-5-items';
        const pageBtn = section?.querySelector('.swiper-pagination-group-5-items') || box?.querySelector('.swiper-pagination-group-5-items') || '.swiper-pagination-group-5-items';

        new Swiper(el, {
          spaceBetween: 30,
          slidesPerView: 5,
          slidesPerGroup: 1,
          loop: true,
          observer: true,
          observeParents: true,
          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn
          },
          pagination: {
            el: pageBtn,
            clickable: true
          },
          breakpoints: {
            1399: { slidesPerView: 5 },
            1100: { slidesPerView: 4 },
            800: { slidesPerView: 3 },
            500: { slidesPerView: 2 },
            0: { slidesPerView: 1 }
          }
        });
      });

      // 1.11 Swiper Auto (.swiper-auto)
      document.querySelectorAll('.swiper-auto').forEach((el) => {
        if (el.swiper) {
          el.swiper.destroy(true, true);
        }
        const box = el.closest('.box-swiper') || el.parentElement;
        const section = el.closest('section') || box?.parentElement || box;
        const prevBtn = section?.querySelector('.swiper-button-prev-group-auto') || box?.querySelector('.swiper-button-prev-group-auto') || '.swiper-button-prev-group-auto';
        const nextBtn = section?.querySelector('.swiper-button-next-group-auto') || box?.querySelector('.swiper-button-next-group-auto') || '.swiper-button-next-group-auto';
        const pageBtn = section?.querySelector('.swiper-pagination-auto') || box?.querySelector('.swiper-pagination-auto') || '.swiper-pagination-auto';

        new Swiper(el, {
          slidesPerView: 'auto',
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          observer: true,
          observeParents: true,
          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn
          },
          pagination: {
            el: pageBtn,
            clickable: true
          }
        });
      });

      // 1.12 Swiper Popular Products & Scrollbar Items (.swiper-popular-product, .swiper-scrollbar-4-items, .swiper-scrollbar-5-items)
      document.querySelectorAll('.swiper-popular-product, .swiper-scrollbar-4-items, .swiper-scrollbar-4-items-2, .swiper-scrollbar-5-items, .swiper-scrollbar-5-items-2').forEach((el) => {
        if (el.swiper) {
          el.swiper.destroy(true, true);
        }
        const box = el.closest('.box-swiper') || el.parentElement;
        const section = el.closest('section') || box?.parentElement || box;
        const is5 = el.classList.contains('swiper-scrollbar-5-items') || el.classList.contains('swiper-scrollbar-5-items-2');
        const prevBtn = section?.querySelector('.swiper-button-prev-popular-product, .swiper-button-prev-scrollbar-product, .swiper-button-prev-scrollbar-product-2') || '.swiper-button-prev-popular-product';
        const nextBtn = section?.querySelector('.swiper-button-next-popular-product, .swiper-button-next-scrollbar-product, .swiper-button-next-scrollbar-product-2') || '.swiper-button-next-popular-product';
        const scrollbarEl = section?.querySelector('.swiper-pagination-popular-product, .swiper-pagination-scrollbar-product, .swiper-pagination-scrollbar-product-2') || box?.querySelector('.swiper-pagination-popular-product');
        const pageEl = section?.querySelector('.swiper-pagination-popular-product-page, .swiper-pagination-scrollbar-product-page');

        new Swiper(el, {
          spaceBetween: 30,
          slidesPerView: is5 ? 5 : 4,
          slidesPerGroup: 1,
          loop: false,
          observer: true,
          observeParents: true,
          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn
          },
          pagination: pageEl ? {
            el: pageEl,
            clickable: true
          } : undefined,
          scrollbar: scrollbarEl ? {
            el: scrollbarEl,
            draggable: true
          } : undefined,
          breakpoints: {
            1399: { slidesPerView: is5 ? 5 : 4 },
            1100: { slidesPerView: 4 },
            800: { slidesPerView: 3 },
            500: { slidesPerView: 2 },
            0: { slidesPerView: 1 }
          }
        });
      });

      // 1.13 Swiper Group Center Items (.swiper-group-center-items - used by Glasses Shop index-33 and Jeans Fashion index-34)
      document.querySelectorAll('.swiper-group-center-items').forEach((el) => {
        if (el.swiper) {
          el.swiper.destroy(true, true);
        }
        const box = el.closest('.box-swiper') || el.parentElement;
        const section = el.closest('section') || box?.parentElement || box;
        const prevBtn = section?.querySelector('.swiper-button-prev-group-center-items') || box?.querySelector('.swiper-button-prev-group-center-items') || '.swiper-button-prev-group-center-items';
        const nextBtn = section?.querySelector('.swiper-button-next-group-center-items') || box?.querySelector('.swiper-button-next-group-center-items') || '.swiper-button-next-group-center-items';
        const pageBtn = section?.querySelector('.swiper-pagination-group-center-items') || box?.querySelector('.swiper-pagination-group-center-items');

        new Swiper(el, {
          spaceBetween: 30,
          slidesPerView: 4,
          centeredSlides: true,
          centeredSlidesBounds: true,
          slidesPerGroup: 1,
          loop: true,
          observer: true,
          observeParents: true,
          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn
          },
          pagination: pageBtn ? {
            el: pageBtn,
            clickable: true
          } : undefined,
          autoplay: {
            delay: 10000,
            disableOnInteraction: false
          },
          breakpoints: {
            1399: { slidesPerView: 4 },
            1100: { slidesPerView: 3 },
            800: { slidesPerView: 2 },
            500: { slidesPerView: 2 },
            0: { slidesPerView: 1 }
          }
        });
      });

      // 1.14 Alignment helper for .container-slider-padding
      const updateSliderPadding = () => {
        const container = document.querySelector('.container');
        if (container) {
          const leftTitle = container.getBoundingClientRect().left + 15;
          document.querySelectorAll('.container-slider-padding').forEach((c) => {
            c.style.paddingLeft = Math.max(15, leftTitle) + 'px';
          });
        }
      };
      updateSliderPadding();
      if (!window.__sliderPaddingBound) {
        window.__sliderPaddingBound = true;
        window.addEventListener('resize', updateSliderPadding);
      }
    } catch (err) {
      console.warn('Swiper initialization note:', err);
    }
  }

  // ==========================================
  // 2. SLICK SLIDERS INITIALIZATION
  // ==========================================
  if ($ && $.fn && $.fn.slick) {
    try {
      // 2.1 Slider 1 (Vertical thumbnails - used by product-single 1, 9, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24)
      const main1 = $('.product-image-slider-1');
      const thumb1 = $('.slider-nav-thumbnails-1');

      if (main1.length && !main1.hasClass('slick-initialized')) {
        main1.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: false,
          asNavFor: thumb1.length ? '.slider-nav-thumbnails-1' : null,
          prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"></button>',
          nextArrow: '<button type="button" class="slick-next" aria-label="Next"></button>'
        });
      }

      if (thumb1.length && !thumb1.hasClass('slick-initialized')) {
        thumb1.slick({
          slidesToShow: 5,
          slidesToScroll: 1,
          asNavFor: '.product-image-slider-1',
          dots: false,
          focusOnSelect: true,
          vertical: true,
          prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"><svg class="w-6 h-6 icon-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg></button>',
          nextArrow: '<button type="button" class="slick-next" aria-label="Next"><svg class="w-6 h-6 icon-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></button>'
        });
      }

      // 2.2 Slider 2 (Horizontal thumbnails - 5 items, used by product-single-2)
      const main2 = $('.product-image-slider-2');
      const thumb2 = $('.slider-nav-thumbnails-2');

      if (main2.length && !main2.hasClass('slick-initialized')) {
        main2.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: false,
          asNavFor: thumb2.length ? '.slider-nav-thumbnails-2' : null,
          prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"></button>',
          nextArrow: '<button type="button" class="slick-next" aria-label="Next"></button>'
        });
      }

      if (thumb2.length && !thumb2.hasClass('slick-initialized')) {
        thumb2.slick({
          slidesToShow: 5,
          slidesToScroll: 1,
          asNavFor: '.product-image-slider-2',
          dots: false,
          focusOnSelect: true,
          vertical: false,
          prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"><svg class="w-6 h-6 icon-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg></button>',
          nextArrow: '<button type="button" class="slick-next" aria-label="Next"><svg class="w-6 h-6 icon-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></button>'
        });
      }

      // 2.3 Slider 3 (Single image slider, used by product-single-3)
      const main3 = $('.product-image-slider-3');
      if (main3.length && !main3.hasClass('slick-initialized')) {
        main3.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: false,
          prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"></button>',
          nextArrow: '<button type="button" class="slick-next" aria-label="Next"></button>'
        });
      }

      // 2.4 Slider 4 (2 slides, used by product-single-4)
      const main4 = $('.product-image-slider-4');
      if (main4.length && !main4.hasClass('slick-initialized')) {
        main4.slick({
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
          fade: false,
          prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"></button>',
          nextArrow: '<button type="button" class="slick-next" aria-label="Next"></button>'
        });
      }

      // 2.5 Slider 5 (Horizontal thumbnails - 4 items, used by product-single-5 & product-single-10)
      const main5 = $('.product-image-slider-5');
      const thumb5 = $('.slider-nav-thumbnails-5');

      if (main5.length && !main5.hasClass('slick-initialized')) {
        main5.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: false,
          asNavFor: thumb5.length ? '.slider-nav-thumbnails-5' : null,
          prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"></button>',
          nextArrow: '<button type="button" class="slick-next"></button>'
        });
      }

      if (thumb5.length && !thumb5.hasClass('slick-initialized')) {
        thumb5.slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          asNavFor: '.product-image-slider-5',
          dots: false,
          focusOnSelect: true,
          vertical: false,
          prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"><svg class="w-6 h-6 icon-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg></button>',
          nextArrow: '<button type="button" class="slick-next" aria-label="Next"><svg class="w-6 h-6 icon-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></button>'
        });
      }

      // 2.6 Preview Modal Slider (.product-image-slider-preview)
      const previewSlider = $('.product-image-slider-preview');
      if (previewSlider.length && !previewSlider.hasClass('slick-initialized')) {
        previewSlider.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
          fade: false,
          prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"></button>',
          nextArrow: '<button type="button" class="slick-next" aria-label="Next"></button>',
          customPaging: function () {
            return '<a class="pager__item"></a>';
          }
        });
      }

      // 2.7 Other numbered sliders fallback (6 through 24)
      for (let i = 6; i <= 24; i++) {
        const main = $(`.product-image-slider-${i}`);
        const thumb = $(`.slider-nav-thumbnails-${i}`);

        if (main.length && !main.hasClass('slick-initialized')) {
          main.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: false,
            asNavFor: thumb.length ? `.slider-nav-thumbnails-${i}` : null,
            prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"></button>',
            nextArrow: '<button type="button" class="slick-next" aria-label="Next"></button>'
          });
        }

        if (thumb.length && !thumb.hasClass('slick-initialized')) {
          thumb.slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: `.product-image-slider-${i}`,
            dots: false,
            focusOnSelect: true,
            vertical: true,
            prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"></button>',
            nextArrow: '<button type="button" class="slick-next" aria-label="Next"></button>'
          });
        }
      }

      // 2.8 Generic fallback
      const genericSliders = $('.product-image-slider:not(.slick-initialized)');
      if (genericSliders.length) {
        genericSliders.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"></button>',
          nextArrow: '<button type="button" class="slick-next" aria-label="Next"></button>'
        });
      }
    } catch (err) {
      console.warn('Slick slider initialization note:', err);
    }
  }

  // ==========================================
  // 3. TAB EVENT LISTENER (Interactive switching & Swiper refresh)
  // ==========================================
  document.querySelectorAll('button[data-bs-toggle="tab"], [data-bs-toggle="pill"]').forEach((btn) => {
    if (btn.hasAttribute('data-tab-bound')) return;
    btn.setAttribute('data-tab-bound', 'true');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = btn.getAttribute('data-bs-target') || btn.getAttribute('href');
      const tabNav = btn.closest('.nav-tabs') || btn.closest('.nav');
      if (tabNav) {
        tabNav.querySelectorAll('.nav-link').forEach((l) => {
          l.classList.remove('active');
          l.setAttribute('aria-selected', 'false');
        });
      }
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      if (targetSelector) {
        const targetPane = document.querySelector(targetSelector);
        if (targetPane && targetPane.parentElement) {
          targetPane.parentElement.querySelectorAll('.tab-pane').forEach((p) => {
            p.classList.remove('show', 'active');
          });
          targetPane.classList.add('show', 'active');
        }
      }

      setTimeout(() => {
        document.querySelectorAll('.swiper-container').forEach((s) => {
          if (s.swiper) s.swiper.update();
        });
      }, 100);
    });
  });

  // ==========================================
  // 4. MOBILE MENU & BURGER DRAWER
  // ==========================================
  const burger = document.querySelector('.burger-icon');
  const mobileDrawer = document.querySelector('.mobile-header-active');
  const closeBtn = document.querySelector('.close-mobile, .mobile-menu-close');

  if (burger && mobileDrawer) {
    burger.onclick = (e) => {
      e.preventDefault();
      burger.classList.toggle('burger-close');
      mobileDrawer.classList.toggle('sidebar-visible');
      document.body.classList.toggle('mobile-menu-active');
    };
  }

  if (closeBtn && mobileDrawer) {
    closeBtn.onclick = (e) => {
      e.preventDefault();
      burger?.classList.remove('burger-close');
      mobileDrawer.classList.remove('sidebar-visible');
      document.body.classList.remove('mobile-menu-active');
    };
  }

  // ==========================================
  // 5. ACCORDION / COLLAPSE
  // ==========================================
  const accordionButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
  accordionButtons.forEach((btn) => {
    if (btn.hasAttribute('data-landing-bound')) return;
    btn.setAttribute('data-landing-bound', 'true');

    btn.addEventListener('click', (e) => {
      const targetSelector = btn.getAttribute('data-bs-target') || btn.getAttribute('href');
      if (!targetSelector) return;
      const target = document.querySelector(targetSelector);
      if (!target) return;

      e.preventDefault();
      const isShown = target.classList.contains('show');
      const parentSelector = target.getAttribute('data-bs-parent');

      if (parentSelector) {
        const parent = document.querySelector(parentSelector);
        if (parent) {
          parent.querySelectorAll('.collapse.show').forEach((el) => el.classList.remove('show'));
          parent.querySelectorAll('[data-bs-toggle="collapse"]').forEach((b) => {
            b.classList.add('collapsed');
            b.setAttribute('aria-expanded', 'false');
          });
        }
      }

      if (isShown) {
        target.classList.remove('show');
        btn.classList.add('collapsed');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        target.classList.add('show');
        btn.classList.remove('collapsed');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ==========================================
  // 6. STICKY HEADER
  // ==========================================
  const handleScroll = () => {
    const stickyHeader = document.querySelector('.sticky-bar');
    if (stickyHeader) {
      if (window.scrollY > 80) {
        stickyHeader.classList.add('stick');
      } else {
        stickyHeader.classList.remove('stick');
      }
    }
  };

  window.removeEventListener('scroll', window.__landingScrollHandler || (() => {}));
  window.__landingScrollHandler = handleScroll;
  window.addEventListener('scroll', handleScroll);

  // ==========================================
  // 7. COUNTDOWN TIMER ([data-countdown])
  // ==========================================
  const renderCountdownBoxes = (el, d, h, m, s) => {
    const days = String(d).padStart(2, '0');
    const hours = String(h).padStart(2, '0');
    const minutes = String(m).padStart(2, '0');
    const seconds = String(s).padStart(2, '0');
    el.innerHTML =
      `<span class="countdown-section"><span class="countdown-amount font-sm-bold lh-16">${days}</span><span class="countdown-period lh-14 font-xs"> days </span></span>` +
      `<span class="countdown-section"><span class="countdown-amount font-sm-bold lh-16">${hours}</span><span class="countdown-period font-xs lh-14"> hour </span></span>` +
      `<span class="countdown-section"><span class="countdown-amount font-sm-bold lh-16">${minutes}</span><span class="countdown-period font-xs lh-14"> min </span></span>` +
      `<span class="countdown-section"><span class="countdown-amount font-sm-bold lh-16">${seconds}</span><span class="countdown-period font-xs lh-14"> sec </span></span>`;
  };

  document.querySelectorAll('[data-countdown]').forEach((el) => {
    let finalDateStr = el.getAttribute('data-countdown');
    if (!el.innerHTML.trim()) {
      renderCountdownBoxes(el, 0, 0, 0, 0);
    }

    if ($ && $.fn && $.fn.countdown && finalDateStr) {
      if (new Date(finalDateStr).getTime() <= Date.now()) {
        const future = new Date(Date.now() + 25 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 35 * 60 * 1000);
        const pad = (n) => String(n).padStart(2, '0');
        finalDateStr = `${future.getFullYear()}/${pad(future.getMonth() + 1)}/${pad(future.getDate())} ${pad(future.getHours())}:${pad(future.getMinutes())}:${pad(future.getSeconds())}`;
      }
      $(el).countdown(finalDateStr, function (event) {
        $(this).html(
          event.strftime(
            '' +
              '<span class="countdown-section"><span class="countdown-amount font-sm-bold lh-16">%D</span><span class="countdown-period lh-14 font-xs"> days </span></span>' +
              '<span class="countdown-section"><span class="countdown-amount font-sm-bold lh-16">%H</span><span class="countdown-period font-xs lh-14"> hour </span></span>' +
              '<span class="countdown-section"><span class="countdown-amount font-sm-bold lh-16">%M</span><span class="countdown-period font-xs lh-14"> min </span></span>' +
              '<span class="countdown-section"><span class="countdown-amount font-sm-bold lh-16">%S</span><span class="countdown-period font-xs lh-14"> sec </span></span>'
          )
        );
      });
    }
  });

  // ==========================================
  // 8. GLIGHTBOX INITIALIZATION
  // ==========================================
  if (window.GLightbox) {
    try {
      window.GLightbox({
        selector: '.glightbox'
      });
    } catch (err) {
      console.warn('GLightbox init note:', err);
    }
  }

  // ==========================================
  // 9. PRODUCT DETAIL CONTROLS (Qty, Color, Size)
  // ==========================================
  // 9.1 Quantity increment / decrement
  document.querySelectorAll('.detail-qty').forEach((wrapper) => {
    if (wrapper.hasAttribute('data-qty-bound')) return;
    wrapper.setAttribute('data-qty-bound', 'true');
    const input = wrapper.querySelector('.qty-val');
    const plus = wrapper.querySelector('.plus');
    const minus = wrapper.querySelector('.minus');

    if (input) {
      if (plus) {
        plus.onclick = (e) => {
          e.preventDefault();
          const current = parseInt(input.value || '1', 10);
          input.value = isNaN(current) ? 1 : current + 1;
        };
      }
      if (minus) {
        minus.onclick = (e) => {
          e.preventDefault();
          const current = parseInt(input.value || '1', 10);
          input.value = Math.max(1, (isNaN(current) ? 1 : current) - 1);
        };
      }
    }
  });

  // 9.2 Color swatch selection
  document.querySelectorAll('.block-color').forEach((block) => {
    const label = block.querySelector('label');
    block.querySelectorAll('.item-color').forEach((item) => {
      if (item.hasAttribute('data-color-bound')) return;
      item.setAttribute('data-color-bound', 'true');
      item.onclick = () => {
        block.querySelectorAll('.item-color').forEach((c) => c.classList.remove('active'));
        item.classList.add('active');
        const colorName = item.getAttribute('data-color') || item.title || item.getAttribute('aria-label');
        if (colorName && label) {
          label.textContent = colorName;
        }
      };
    });
  });

  // 9.3 Size swatch selection
  document.querySelectorAll('.block-size').forEach((block) => {
    const label = block.querySelector('label');
    block.querySelectorAll('.list-sizes .item-size').forEach((item) => {
      if (item.classList.contains('out-stock')) return;
      if (item.hasAttribute('data-size-bound')) return;
      item.setAttribute('data-size-bound', 'true');
      item.onclick = () => {
        block.querySelectorAll('.list-sizes .item-size').forEach((s) => s.classList.remove('active'));
        item.classList.add('active');
        if (label) {
          label.textContent = item.textContent.trim();
        }
      };
    });
  });

  // ==========================================
  // 10. SHOP FILTERS, VIEW SWITCHER & PRODUCT PREVIEW MODAL
  // ==========================================
  // 10.1 Filter Toggle (.btn-open-filter, .btn-open-filter-click, .show-sm .btn-open-filter)
  document.querySelectorAll('.left-filter .btn-open-filter, .btn-open-filter-click, .show-sm .btn-open-filter').forEach((btn) => {
    if (btn.hasAttribute('data-filter-bound')) return;
    btn.setAttribute('data-filter-bound', 'true');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const canvasFilter = document.querySelector('.block-filter-canvas');
      const middleFilter = document.querySelector('.block-filter-middle');
      const sidebarFilter = document.querySelector('.box-filters-sidebar');
      const overlay = document.querySelector('.wrapper-overlay');

      // Mobile sidebar filter (.show-sm .btn-open-filter)
      if (btn.closest('.show-sm') && sidebarFilter) {
        const isActive = sidebarFilter.classList.contains('active');
        if (!isActive) {
          if (overlay) overlay.style.display = 'block';
          sidebarFilter.classList.add('active');
        } else {
          if (overlay) overlay.style.display = 'none';
          sidebarFilter.classList.remove('active');
        }
        return;
      }

      // Offcanvas filter (shop-canvas-filter)
      if (canvasFilter) {
        const isActive = canvasFilter.classList.contains('active');
        if (!isActive) {
          if (overlay) overlay.style.display = 'block';
          canvasFilter.style.display = 'block';
          canvasFilter.classList.add('active');
        } else {
          if (overlay) overlay.style.display = 'none';
          canvasFilter.style.display = 'none';
          canvasFilter.classList.remove('active');
        }
        return;
      }

      // Top collapsible filter (shop-top-filter, shop-show-category)
      if (middleFilter) {
        if (window.$ && typeof $(middleFilter).slideToggle === 'function') {
          $(middleFilter).slideToggle();
        } else {
          const isHidden = window.getComputedStyle(middleFilter).display === 'none';
          middleFilter.style.display = isHidden ? 'block' : 'none';
        }
      }
    });
  });

  // 10.2 Overlay Click to Close All Popups/Canvas/Sidebar
  document.querySelectorAll('.wrapper-overlay').forEach((overlay) => {
    if (overlay.hasAttribute('data-overlay-bound')) return;
    overlay.setAttribute('data-overlay-bound', 'true');
    overlay.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.style.display = 'none';
      document.querySelectorAll('.block-filter-canvas').forEach((el) => {
        el.classList.remove('active');
        el.style.display = 'none';
      });
      document.querySelectorAll('.box-filters-sidebar').forEach((el) => {
        el.classList.remove('active');
      });
      document.querySelectorAll('.wrapper-popup').forEach((el) => {
        el.classList.remove('active');
        el.style.display = 'none';
      });
    });
  });

  // 10.3 Grid / Column View Switcher (.view-type)
  document.querySelectorAll('.view-type').forEach((btn) => {
    if (btn.hasAttribute('data-view-bound')) return;
    btn.setAttribute('data-view-bound', 'true');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.view-type').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const col = btn.getAttribute('data-col');
      const container = document.querySelector('.box-list-products');
      if (container && col) {
        container.classList.remove('grid-col-2', 'grid-col-3', 'grid-col-4', 'grid-col-5');
        container.classList.add(`grid-col-${col}`);
      }
    });
  });

  // 10.4 Filter Accordion Toggle (.item-collapse)
  document.querySelectorAll('.item-collapse').forEach((titleEl) => {
    if (titleEl.hasAttribute('data-collapse-bound')) return;
    titleEl.setAttribute('data-collapse-bound', 'true');
    titleEl.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = titleEl.closest('.block-filter');
      const box = parent?.querySelector('.box-collapse');
      if (!box) return;

      const isHidden = window.getComputedStyle(box).display === 'none';
      if (window.$ && typeof $(box).slideToggle === 'function') {
        $(box).slideToggle();
        titleEl.classList.toggle('collapsed-item');
      } else {
        box.style.display = isHidden ? 'block' : 'none';
        titleEl.classList.toggle('collapsed-item', !isHidden);
      }
    });
  });

  // 10.5 Category Submenu Arrow (.arrow-down)
  document.querySelectorAll('.list-filter-checkbox .arrow-down').forEach((arrow) => {
    if (arrow.hasAttribute('data-arrow-bound')) return;
    arrow.setAttribute('data-arrow-bound', 'true');
    arrow.addEventListener('click', (e) => {
      e.preventDefault();
      const parentLi = arrow.closest('li');
      const subUl = parentLi?.querySelector('ul');
      if (subUl) {
        if (window.$ && typeof $(subUl).slideToggle === 'function') {
          $(subUl).slideToggle();
        } else {
          const isHidden = window.getComputedStyle(subUl).display === 'none';
          subUl.style.display = isHidden ? 'block' : 'none';
        }
      }
    });
  });

  // 10.6 Sidebar Filter Swatches (Colors & Sizes)
  document.querySelectorAll('.list-colors li').forEach((item) => {
    if (item.hasAttribute('data-swatch-bound')) return;
    item.setAttribute('data-swatch-bound', 'true');
    item.addEventListener('click', () => {
      const list = item.closest('.list-colors');
      list?.querySelectorAll('li').forEach((li) => li.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // 10.7 Active Filter Tag Removal & Clear Filters
  document.querySelectorAll('.close-tag, .block-ele-filter a.btn-tag-filter .btn-close').forEach((closeBtn) => {
    if (closeBtn.hasAttribute('data-tag-bound')) return;
    closeBtn.setAttribute('data-tag-bound', 'true');
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const tag = closeBtn.closest('a.btn-tag-filter');
      tag?.remove();
      const remaining = document.querySelectorAll('.block-ele-filter a.btn-tag-filter');
      if (remaining.length === 0) {
        const yourFilter = document.querySelector('.box-your-filter');
        if (yourFilter) yourFilter.style.display = 'none';
      }
    });
  });

  document.querySelectorAll('.clear-filter').forEach((clearBtn) => {
    if (clearBtn.hasAttribute('data-clear-bound')) return;
    clearBtn.setAttribute('data-clear-bound', 'true');
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.block-ele-filter a.btn-tag-filter').forEach((t) => t.remove());
      const yourFilter = document.querySelector('.box-your-filter');
      if (yourFilter) yourFilter.style.display = 'none';
    });
  });

  // 10.8 Product Quick View Preview Modal (.preview-product)
  document.querySelectorAll('.preview-product').forEach((btn) => {
    if (btn.hasAttribute('data-preview-bound')) return;
    btn.setAttribute('data-preview-bound', 'true');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const popup = document.querySelector('.box-popup-preview');
      if (popup) {
        popup.style.display = 'block';
        if (window.$ && $.fn && $.fn.slick) {
          const previewSlider = $('.product-image-slider-preview');
          if (previewSlider.length) {
            if (!previewSlider.hasClass('slick-initialized')) {
              previewSlider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: true,
                fade: false,
                prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"></button>',
                nextArrow: '<button type="button" class="slick-next" aria-label="Next"></button>',
                customPaging: function () {
                  return '<a class="pager__item"></a>';
                }
              });
            } else {
              previewSlider.slick('setPosition');
            }
          }
        }
      }
    });
  });

  // 10.9 Close Product Preview Modal (.btn-close-popup, .btn-close-preview)
  document.querySelectorAll('.btn-close-popup, .btn-close-preview').forEach((btn) => {
    if (btn.hasAttribute('data-close-preview-bound')) return;
    btn.setAttribute('data-close-preview-bound', 'true');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const popup = document.querySelector('.box-popup-preview');
      if (popup) popup.style.display = 'none';
    });
  });

  document.querySelectorAll('.box-popup-preview').forEach((popup) => {
    if (popup.hasAttribute('data-backdrop-bound')) return;
    popup.setAttribute('data-backdrop-bound', 'true');
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });
  });

  // ==========================================
  // 11. CART PAGE INTERACTION (.btn-remove-cart)
  // ==========================================
  document.querySelectorAll('.btn-remove-cart').forEach((btn) => {
    if (btn.hasAttribute('data-remove-bound')) return;
    btn.setAttribute('data-remove-bound', 'true');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const item = btn.closest('.item-cart');
      if (item) {
        item.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.96)';
        setTimeout(() => {
          item.remove();
          const remaining = document.querySelectorAll('.list-items-cart .item-cart').length;
          const countTitle = document.querySelector('.box-title-cart h6');
          if (countTitle) {
            countTitle.textContent = `${remaining} ${remaining === 1 ? 'item' : 'items'}`;
          }
        }, 250);
      }
    });
  });

  // ==========================================
  // 12. CHECKOUT PAYMENT METHOD ACCORDION
  // ==========================================
  document.querySelectorAll('.box-payment-method input[type="radio"][name="payment"]').forEach((radio) => {
    if (radio.hasAttribute('data-payment-bound')) return;
    radio.setAttribute('data-payment-bound', 'true');
    radio.addEventListener('change', () => {
      document.querySelectorAll('.box-payment-method .extra-info').forEach((info) => info.classList.remove('active'));
      const parent = radio.closest('.item-radio');
      const extra = parent?.querySelector('.extra-info');
      if (extra) extra.classList.add('active');
    });
  });

  // ==========================================
  // 13. CUSTOMER SERVICE MENU TABS (.menu-left)
  // ==========================================
  document.querySelectorAll('.menu-left li a').forEach((link) => {
    if (link.hasAttribute('data-menu-bound')) return;
    link.setAttribute('data-menu-bound', 'true');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.menu-left li a').forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // ==========================================
  // 14. BLOG CATEGORY TABS (.nav-tab-grey li a)
  // ==========================================
  document.querySelectorAll('.nav-tab-grey').forEach((tabContainer) => {
    const links = tabContainer.querySelectorAll('li a');
    const hasActive = Array.from(links).some((l) => l.classList.contains('active'));
    if (!hasActive && links.length > 0) {
      links[0].classList.add('active');
    }
    links.forEach((link) => {
      if (link.hasAttribute('data-blog-tab-bound')) return;
      link.setAttribute('data-blog-tab-bound', 'true');
      link.addEventListener('click', (e) => {
        e.preventDefault();
        links.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  });

  // ==========================================
  // 15. BLOG PAGINATION (.box-pagination .page-link)
  // ==========================================
  document.querySelectorAll('.box-pagination .page-link').forEach((link) => {
    if (link.hasAttribute('data-page-bound')) return;
    link.setAttribute('data-page-bound', 'true');
    link.addEventListener('click', (e) => {
      const txt = link.textContent.trim();
      if (!txt || txt === '...' || link.classList.contains('page-prev') || link.classList.contains('page-next')) {
        return;
      }
      e.preventDefault();
      const parentNav = link.closest('.box-pagination');
      parentNav?.querySelectorAll('.page-link').forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // ==========================================
  // 16. MASONRY GRID LAYOUT REFRESH
  // ==========================================
  const masonryGrids = document.querySelectorAll('[data-masonry]');
  if (masonryGrids.length > 0 && window.$ && $.fn && $.fn.imagesLoaded) {
    $(masonryGrids).imagesLoaded(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }

  // ==========================================
  // 17. CONTACT FORM INTERACTION
  // ==========================================
  document.querySelectorAll('.block-form-contact button.btn-black').forEach((btn) => {
    if (btn.hasAttribute('data-contact-bound')) return;
    btn.setAttribute('data-contact-bound', 'true');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = btn.closest('.block-form-contact');
      const nameInput = parent?.querySelector('input[placeholder*="Name"]');
      const emailInput = parent?.querySelector('input[placeholder*="Email"]');
      const contentInput = parent?.querySelector('textarea');

      if (!nameInput?.value.trim() || !emailInput?.value.trim()) {
        alert('Please enter your name and email address.');
        return;
      }

      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.classList.remove('btn-black');
        btn.classList.add('btn-navy');
        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (contentInput) contentInput.value = '';
        const phoneInput = parent?.querySelector('input[placeholder*="Phone"]');
        const webInput = parent?.querySelector('input[placeholder*="Website"]');
        if (phoneInput) phoneInput.value = '';
        if (webInput) webInput.value = '';
        setTimeout(() => {
          btn.textContent = originalText || 'Post Comment';
          btn.classList.remove('btn-navy');
          btn.classList.add('btn-black');
          btn.disabled = false;
        }, 3000);
      }, 600);
    });
  });
};
