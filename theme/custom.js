// Mojo Gogo 自定义导航栏
document.addEventListener('DOMContentLoaded', function() {
    // 创建自定义导航栏
    const customHeader = document.createElement('div');
    customHeader.className = 'custom-header';
    
    // 左侧：Logo + 项目名
    const headerLeft = document.createElement('div');
    headerLeft.className = 'header-left';
    
    // Logo - 修复路径问题
    const logo = document.createElement('img');
    // 获取当前页面的路径深度，动态设置logo路径
    const pathDepth = window.location.pathname.split('/').length - 2;
    const logoPath = pathDepth > 1 ? '../'.repeat(pathDepth - 1) + 'assets/logo.svg' : 'assets/logo.svg';
    logo.src = logoPath;
    logo.alt = 'Mojo Gogo Logo';
    logo.className = 'header-logo';
    
    // 添加错误处理
    logo.onerror = function() {
        console.log('Logo加载失败，尝试备用路径');
        // 尝试不同的路径
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
                // 如果所有路径都失败，显示文字替代
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
    
    // 项目名
    const title = document.createElement('a');
    title.href = '/';
    title.className = 'header-title';
    title.textContent = 'Mojo Gogo';
    
    headerLeft.appendChild(logo);
    headerLeft.appendChild(title);
    
    // 右侧：导航链接 + 搜索
    const headerRight = document.createElement('div');
    headerRight.className = 'header-right';
    
    // 导航链接
    const navLinks = document.createElement('div');
    navLinks.className = 'nav-links';
    
    const links = [
        { text: 'Official Website', url: '#' },
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
    
    // 搜索容器
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.className = 'search-input';
    
    // 搜索功能
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
            // 这里可以实现实际的搜索功能
            console.log('搜索:', query);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = e.target.value.toLowerCase();
            if (query.length > 0) {
                // 触发 mdBook 的搜索功能
                const searchButton = document.querySelector('#search-toggle');
                if (searchButton) {
                    searchButton.click();
                    setTimeout(() => {
                        const mdBookSearchInput = document.querySelector('.search-input');
                        if (mdBookSearchInput) {
                            mdBookSearchInput.value = query;
                            mdBookSearchInput.dispatchEvent(new Event('input'));
                        }
                    }, 100);
                }
            }
        }
    });
    
    searchContainer.appendChild(searchInput);
    
    // 组装导航栏
    headerRight.appendChild(navLinks);
    headerRight.appendChild(searchContainer);
    
    customHeader.appendChild(headerLeft);
    customHeader.appendChild(headerRight);
    
    // 插入到页面顶部
    document.body.insertBefore(customHeader, document.body.firstChild);
    
    // 隐藏原始的 mdBook 头部
    const originalHeader = document.querySelector('.menu-bar');
    if (originalHeader) {
        originalHeader.style.display = 'none';
    }
    
    // 处理页面滚动时的效果
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动，隐藏导航栏
            customHeader.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动，显示导航栏
            customHeader.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 添加平滑过渡效果
    customHeader.style.transition = 'transform 0.3s ease-in-out';
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