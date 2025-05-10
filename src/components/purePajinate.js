function purePajinate(options) {
    // Default options
    const settings = Object.assign({
      containerSelector: '',
      itemSelector: '',
      navigationSelector: '',
      itemsPerPage: 6,
      pageLinksToDisplay: 5,
      startPage: 1,
      wrapAround: false,
      navLabelPrev: '&laquo;',
      navLabelNext: '&raquo;',
      navLabelFirst: '&laquo;&laquo;',
      navLabelLast: '&raquo;&raquo;',
      showFirstLast: false,
      navClass: '',
      debugMode: false
    }, options);
  
    const container = document.querySelector(settings.containerSelector);
    const navigation = document.querySelector(settings.navigationSelector);
    
    if (!container || !navigation) {
      if (settings.debugMode) {
        console.error('One or more of the required elements does not exist.');
      }
      return;
    }
  
    const items = container.querySelectorAll(settings.itemSelector);
    const itemCount = items.length;
    const pageCount = Math.ceil(itemCount / settings.itemsPerPage);
    let currentPage = settings.startPage;
  
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > pageCount) {
      currentPage = pageCount;
    }
  
    // Initialize
    showPage(currentPage);
    createNavigation(currentPage);
  
    function showPage(pageNumber) {
      // Hide all items
      items.forEach(item => {
        item.style.display = 'none';
      });
  
      // Calculate start and end items
      const startIndex = (pageNumber - 1) * settings.itemsPerPage;
      const endIndex = Math.min(startIndex + settings.itemsPerPage - 1, itemCount - 1);
  
      // Show items for current page
      for (let i = startIndex; i <= endIndex; i++) {
        items[i].style.display = '';
      }
    }
  
    function createNavigation(currentPage) {
      navigation.innerHTML = '';
      
      const ul = document.createElement('ul');
      ul.className = settings.navClass;
      
      // First link
      if (settings.showFirstLast) {
        const firstLi = createPageLink(1, 'first_link', settings.navLabelFirst);
        if (currentPage === 1) {
          firstLi.className += ' no_more disabled';
        }
        ul.appendChild(firstLi);
      }
  
      // Previous link
      const prevLi = createPageLink(
        currentPage - 1 > 0 ? currentPage - 1 : settings.wrapAround ? pageCount : 1,
        'previous_link',
        settings.navLabelPrev
      );
      if (currentPage === 1 && !settings.wrapAround) {
        prevLi.className += ' no_more disabled';
      }
      ul.appendChild(prevLi);
  
      // Page links
      let startPageLink = 1;
      let endPageLink = pageCount;
  
      if (pageCount > settings.pageLinksToDisplay) {
        const halfDisplay = Math.floor(settings.pageLinksToDisplay / 2);
        startPageLink = Math.max(currentPage - halfDisplay, 1);
        endPageLink = Math.min(startPageLink + settings.pageLinksToDisplay - 1, pageCount);
        
        if (endPageLink - startPageLink + 1 < settings.pageLinksToDisplay) {
          startPageLink = Math.max(endPageLink - settings.pageLinksToDisplay + 1, 1);
        }
      }
  
      for (let i = startPageLink; i <= endPageLink; i++) {
        const pageLi = createPageLink(i, 'page_link' + (i === 1 ? ' first' : ''), `<span>${i}</span>`);
        if (i === currentPage) {
          pageLi.className += ' active_page active';
        }
        ul.appendChild(pageLi);
      }
  
      // Next link
      const nextLi = createPageLink(
        currentPage + 1 <= pageCount ? currentPage + 1 : settings.wrapAround ? 1 : pageCount,
        'next_link',
        settings.navLabelNext
      );
      if (currentPage === pageCount && !settings.wrapAround) {
        nextLi.className += ' no_more disabled';
      }
      ul.appendChild(nextLi);
  
      // Last link
      if (settings.showFirstLast) {
        const lastLi = createPageLink(pageCount, 'last_link', settings.navLabelLast);
        if (currentPage === pageCount) {
          lastLi.className += ' no_more disabled';
        }
        ul.appendChild(lastLi);
      }
  
      navigation.appendChild(ul);
  
      // Add event listeners to all links
      const links = ul.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const pageNum = parseInt(this.getAttribute('data-page'));
          currentPage = pageNum;
          showPage(currentPage);
          createNavigation(currentPage);
        });
      });
    }
  
    function createPageLink(pageNumber, className, label) {
      const li = document.createElement('li');
      li.className = className;
      
      const a = document.createElement('a');
      a.href = '#';
      a.setAttribute('data-page', pageNumber);
      a.innerHTML = label;
      
      li.appendChild(a);
      return li;
    }
  
    // Return public methods
    return {
      showPage: showPage,
      updateNavigation: createNavigation,
      getPageCount: () => pageCount,
      getCurrentPage: () => currentPage,
      setCurrentPage: page => {
        if (page >= 1 && page <= pageCount) {
          currentPage = page;
          showPage(currentPage);
          createNavigation(currentPage);
        }
      }
    };
  }
  
  // Export for module use
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = purePajinate;
  }