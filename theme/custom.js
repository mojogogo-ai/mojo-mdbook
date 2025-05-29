// Mojo Gogo 自定义导航栏
document.addEventListener('DOMContentLoaded', function() {
    // 创建自定义导航栏
    const customHeader = document.createElement('div');
    customHeader.className = 'custom-header';
    
    // 左侧：移动端菜单按钮 + Logo + 项目名
    const headerLeft = document.createElement('div');
    headerLeft.className = 'header-left';
    
    // 移动端侧边栏切换按钮
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fa fa-bars"></i>';
    
    // 点击事件处理
    mobileMenuToggle.addEventListener('click', function() {
        const html = document.documentElement;
        const sidebarToggleAnchor = document.getElementById('sidebar-toggle-anchor');
        
        if (sidebarToggleAnchor) {
            sidebarToggleAnchor.checked = !sidebarToggleAnchor.checked;
            const event = new Event('change', { bubbles: true });
            sidebarToggleAnchor.dispatchEvent(event);
            
            if (sidebarToggleAnchor.checked) {
                html.classList.remove('sidebar-hidden');
                html.classList.add('sidebar-visible');
                localStorage.setItem('mdbook-sidebar', 'visible');
            } else {
                html.classList.remove('sidebar-visible');
                html.classList.add('sidebar-hidden');
                localStorage.setItem('mdbook-sidebar', 'hidden');
            }
        }
    });
    
    // 悬停效果
    mobileMenuToggle.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(102, 126, 234, 0.1)';
        this.style.color = '#667eea';
    });
    
    mobileMenuToggle.addEventListener('mouseleave', function() {
        this.style.background = 'none';
        this.style.color = '#6a6e77';
    });
    
    // Logo - 修复路径问题
    const logo = document.createElement('img');
    const pathDepth = window.location.pathname.split('/').length - 2;
    const logoPath = pathDepth > 1 ? '../'.repeat(pathDepth - 1) + 'assets/logo.svg' : 'assets/logo.svg';
    logo.src = logoPath;
    logo.alt = 'Mojo Gogo Logo';
    logo.className = 'header-logo';
    
    logo.onerror = function() {
        const altPaths = [
            './assets/logo.svg',
            '../assets/logo.svg',
            '../../assets/logo.svg',
            '/assets/logo.svg'
        ];
        let currentIndex = 0;
        const tryNextPath = () => {
            if (currentIndex < altPaths.length) {
                this.src = altPaths[currentIndex];
                currentIndex++;
            } else {
                this.style.display = 'none';
                const textLogo = document.createElement('div');
                textLogo.style.cssText = `
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 18px;
                `;
                textLogo.textContent = 'M';
                this.parentNode.insertBefore(textLogo, this);
            }
        };
        this.onerror = tryNextPath;
        tryNextPath();
    };
    
    const title = document.createElement('a');
    title.href = '/';
    title.className = 'header-title';
    title.textContent = 'Mojo Gogo';
    
    headerLeft.appendChild(mobileMenuToggle);
    headerLeft.appendChild(logo);
    headerLeft.appendChild(title);
    
    const headerRight = document.createElement('div');
    headerRight.className = 'header-right';
    
    const navLinks = document.createElement('div');
    navLinks.className = 'nav-links';
    
    const links = [
        { text: 'Official Website', url: 'https://mojogogo.ai/' },
        { text: 'X (Twitter)', url: '#' },
        { text: 'Discord', url: '#' },
        { text: 'Medium', url: '#' }
    ];
    
    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.text;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        navLinks.appendChild(a);
    });
    
    const navMenuToggle = document.createElement('button');
    navMenuToggle.className = 'nav-menu-toggle';
    navMenuToggle.innerHTML = '<i class="fa fa-ellipsis-h"></i>';
    
    const navDropdown = document.createElement('div');
    navDropdown.className = 'nav-dropdown';
    
    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.text;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        navDropdown.appendChild(a);
    });
    
    navMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navDropdown.classList.toggle('show');
    });
    
    document.addEventListener('click', function() {
        navDropdown.classList.remove('show');
    });
    
    navDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    // This is the search input visible in the custom header on larger screens
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.className = 'search-input';
    
    // This is the search icon visible in the custom header on smaller screens
    const searchToggle = document.createElement('button');
    searchToggle.className = 'search-toggle';
    searchToggle.innerHTML = '<i class="fa fa-search"></i>';
    
    // Event listener for the search input in the custom header (for larger screens)
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = e.target.value.toLowerCase();
            if (query.length > 0) {
                const mdBookSearchButton = document.querySelector('#search-toggle'); // mdBook's native search toggle button
                const mdBookSearchInput = document.querySelector('#searchbar');    // mdBook's native search input

                if (mdBookSearchButton && mdBookSearchInput) {
                    // If mdBook's search isn't already open, click its button to open it
                    if (document.querySelector('#search-wrapper').classList.contains('hidden')) {
                        mdBookSearchButton.click(); 
                    }
                    // Set value and trigger input event on mdBook's search input
                    setTimeout(() => {
                        mdBookSearchInput.value = query;
                        mdBookSearchInput.dispatchEvent(new Event('input'));
                    }, 100); 
                }
            }
        }
    });

    // Event listener for the search icon in the custom header (for smaller screens)
    searchToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const mdBookSearchButton = document.querySelector('#search-toggle'); // mdBook's native search toggle button
        const mdBookSearchInput = document.querySelector('#searchbar');    // mdBook's native search input

        if (mdBookSearchButton) {
            mdBookSearchButton.click(); // Click mdBook's native search button to show/hide its search bar
            
            // If mdBook's search bar is now visible, focus on its input
            setTimeout(() => {
                if (mdBookSearchInput && !document.querySelector('#search-wrapper').classList.contains('hidden')) {
                    mdBookSearchInput.focus();
                }
            }, 50); 
        }
    });
    
    searchContainer.appendChild(searchInput); // Add the custom header's search input
    searchContainer.appendChild(searchToggle);  // Add the custom header's search icon
    
    headerRight.appendChild(navLinks);
    headerRight.appendChild(navMenuToggle);
    headerRight.appendChild(navDropdown);
    headerRight.appendChild(searchContainer);
    
    customHeader.appendChild(headerLeft);
    customHeader.appendChild(headerRight);
    
    document.body.insertBefore(customHeader, document.body.firstChild);
    
    const originalHeader = document.querySelector('.menu-bar');
    if (originalHeader) {
        originalHeader.style.cssText = ` display: none !important; `;
        const sidebarToggleBtn = document.getElementById('sidebar-toggle');
        if (sidebarToggleBtn) {
            sidebarToggleBtn.style.display = 'block';
        }
    }
});

// 主题切换功能（如果需要）
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark');
    
    if (isDark) {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// 页面加载时应用保存的主题
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
}); 