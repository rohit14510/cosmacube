 
        // Sample Products Data
        const products = [
            { name: 'Hydrating Body Lotion', category: 'Body Care', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100' },
            { name: 'Refreshing Body Wash', category: 'Body Care', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=100' },
            { name: 'Exfoliating Body Scrub', category: 'Body Care', image: 'https://images.unsplash.com/photo-1591360236480-4ed861025fa1?w=100' },
            { name: 'Nourishing Body Oil', category: 'Body Care', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100' },
            { name: 'Daily Face Cleanser', category: 'Face Care', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100' },
            { name: 'Vitamin C Serum', category: 'Face Care', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100' },
            { name: 'Hydrating Face Mask', category: 'Face Care', image: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=100' },
            { name: 'Moisturizing Cream', category: 'Face Care', image: 'https://images.unsplash.com/photo-1556228852-80a0e536a555?w=100' },
            { name: 'Balancing Toner', category: 'Face Care', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=100' },
            { name: 'Anti-Aging Eye Cream', category: 'Face Care', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=100' }
        ];

        // Desktop - Mega Dropdown Toggle (Click)
        let activeDropdown = null;

        $('.nav-link[data-category]').on('click', function(e) {
            e.preventDefault();
            const category = $(this).data('category');
            const dropdownId = category === 'body-care' ? 'bodyCareDropdown' : 'faceCareDropdown';
            
            if (activeDropdown === dropdownId) {
                // Close if same clicked
                closeDropdown();
            } else {
                // Open new dropdown
                closeDropdown();
                $(this).addClass('active');
                $(`#${dropdownId}`).addClass('active');
                $('#dropdownOverlay').addClass('active');
                $('body').css('overflow', 'hidden');
                activeDropdown = dropdownId;
            }
        });

        function closeDropdown() {
            $('.mega-dropdown').removeClass('active');
            $('.nav-link').removeClass('active');
            $('#dropdownOverlay').removeClass('active');
            $('body').css('overflow', '');
            activeDropdown = null;
        }

        // Close on overlay click
        $('#dropdownOverlay').on('click', closeDropdown);

        // Close on ESC key
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' && activeDropdown) {
                closeDropdown();
            }
        });

        // Category card click
        $('.category-card').on('click', function() {
            const product = $(this).find('.category-name').text();
            console.log('Navigate to:', product);
            closeDropdown();
        });

        // Search Functionality
        function setupSearch(inputId, resultsId) {
            $(`#${inputId}`).on('input', function() {
                const query = $(this).val().toLowerCase().trim();
                const resultsDiv = $(`#${resultsId}`);
                
                if (query.length < 2) {
                    resultsDiv.hide().empty();
                    return;
                }

                const filtered = products.filter(p => 
                    p.name.toLowerCase().includes(query) || 
                    p.category.toLowerCase().includes(query)
                );

                if (filtered.length > 0) {
                    let html = '';
                    filtered.forEach(product => {
                        html += `
                            <div class="search-result-item">
                                <img src="${product.image}" alt="${product.name}">
                                <div class="search-result-info">
                                    <div class="search-result-name">${product.name}</div>
                                    <div class="search-result-category">${product.category}</div>
                                </div>
                            </div>
                        `;
                    });
                    resultsDiv.html(html).show();
                } else {
                    resultsDiv.html('<div class="search-result-item"><div class="search-result-info"><div class="search-result-name">No products found</div></div></div>').show();
                }
            });

            // Close on click outside
            $(document).on('click', function(e) {
                if (!$(e.target).closest('.search-wrapper').length && !$(e.target).closest('.search-modal').length) {
                    $(`#${resultsId}`).hide();
                }
            });

            // Result click
            $(document).on('click', `#${resultsId} .search-result-item`, function() {
                const productName = $(this).find('.search-result-name').text();
                if (productName !== 'No products found') {
                    console.log('Product clicked:', productName);
                    $(`#${resultsId}`).hide();
                    $(`#${inputId}`).val('');
                    if (resultsId === 'mobileSearchResults') {
                        $('#searchModal').removeClass('active');
                        $('body').css('overflow', '');
                    }
                }
            });
        }

        setupSearch('desktopSearch', 'desktopSearchResults');
        setupSearch('mobileSearch', 'mobileSearchResults');

        // Mobile Menu Toggle
        $('#mobileMenuBtn').on('click', function() {
            $('#mobileSidebar').addClass('active');
            $('#pageOverlay').addClass('active');
            $('body').css('overflow', 'hidden');
        });

        $('#sidebarClose, #pageOverlay').on('click', function() {
            $('#mobileSidebar').removeClass('active');
            $('#pageOverlay').removeClass('active');
            $('body').css('overflow', '');
        });

        // Mobile Category Toggle
        $('.category-header').on('click', function() {
            const submenuId = $(this).data('toggle');
            const submenu = $(`#${submenuId}`);
            
            $(this).toggleClass('active');
            submenu.toggleClass('active');
        });

        // Mobile Submenu Item Click
        $('.submenu-item').on('click', function() {
            const product = $(this).find('span').text();
            console.log('Navigate to:', product);
            $('#mobileSidebar').removeClass('active');
            $('#pageOverlay').removeClass('active');
            $('body').css('overflow', '');
        });

        // Mobile Search Modal
        $('#mobileSearchBtn').on('click', function() {
            $('#searchModal').addClass('active');
            $('body').css('overflow', 'hidden');
            $('#mobileSearch').focus();
        });

        $('#searchModalClose').on('click', function() {
            $('#searchModal').removeClass('active');
            $('#mobileSearch').val('');
            $('#mobileSearchResults').empty().hide();
            $('body').css('overflow', '');
        });

        // Mobile Bottom Nav Active State
        $('.nav-item-btn').on('click', function(e) {
            e.preventDefault();
            $('.nav-item-btn').removeClass('active');
            $(this).addClass('active');
        });
   
 // Hero Swiper Slider
  var swiper = new Swiper(".heroSwiper", {
    slidesPerView: 2,        
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1, // Mobile view
      },
      768: {
        slidesPerView: 1, // Tablet and up
      },
    },
  });


    var swiper = new Swiper(".testimonialSwiper", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

   var swiper = new Swiper(".blogSwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
  document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".BannerSwiper", {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      speed: 600,
    });
  });
 
  const buttons = document.querySelectorAll('.category-btn');
  const bodySection = document.getElementById('bodySection');
  const skinSection = document.getElementById('skinSection');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      if (category === 'body') {
        bodySection.style.display = 'flex';
        skinSection.style.display = 'none';
      } 
      else if (category === 'skin') {
        skinSection.style.display = 'flex';
        bodySection.style.display = 'none';
      } 
      else { // all
        skinSection.style.display = 'flex';
        bodySection.style.display = 'flex';
      }
    });
  });

  // Default: All products visible
  skinSection.style.display = 'flex';
  bodySection.style.display = 'flex';

