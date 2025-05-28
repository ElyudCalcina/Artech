/**
 * JavaScript para Artech - Carpintería Profesional
 * Funcionalidades: Menú móvil, navegación suave, animaciones
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MENÚ HAMBURGUESA MÓVIL ==========
    function initMobileMenu() {
        // Crear el botón hamburguesa si no existe
        const nav = document.querySelector('nav');
        const menu = document.querySelector('.menu');
        
        if (!document.querySelector('.menu-toggle')) {
            const menuToggle = document.createElement('div');
            menuToggle.className = 'menu-toggle';
            menuToggle.innerHTML = '<span></span><span></span><span></span>';
            
            // Insertar el botón después del nav
            nav.parentNode.insertBefore(menuToggle, nav.nextSibling);
        }
        
        const menuToggle = document.querySelector('.menu-toggle');
        
        // Toggle del menú móvil
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Cerrar menú al hacer click en un enlace
        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Cerrar menú al hacer click fuera de él
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // ========== NAVEGACIÓN SUAVE ==========
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ========== HEADER TRANSPARENTE EN SCROLL ==========
    function initHeaderScroll() {
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.backgroundColor = 'rgba(245, 224, 199, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = '#f5e0c7f0';
                header.style.backdropFilter = 'none';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // ========== ANIMACIÓN DE ESTADÍSTICAS ==========
    function initStatsAnimation() {
        const stats = document.querySelectorAll('.stat-item h3');
        const statsSection = document.querySelector('.stats');
        let statsAnimated = false;
        
        function animateStats() {
            if (statsAnimated) return;
            
            stats.forEach((stat, index) => {
                const finalValue = parseInt(stat.textContent);
                const isPlus = stat.textContent.includes('+');
                let currentValue = 0;
                const increment = finalValue / 50; // 50 pasos para la animación
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        stat.textContent = finalValue + (isPlus ? '+' : '');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(currentValue) + (isPlus ? '+' : '');
                    }
                }, 30);
            });
            
            statsAnimated = true;
        }
        
        // Observador para activar animación cuando sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
    
    // ========== ANIMACIÓN FADE-IN AL SCROLL ==========
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.service-card, .quality-item, .project-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
    
    // ========== BOTÓN "VER DETALLES" INTERACTIVO ==========
    function initServiceButtons() {
        const serviceButtons = document.querySelectorAll('.service-card .btn');
        
        serviceButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Efecto visual de click
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-3px)';
                }, 150);
                
                // Obtener el título del servicio
                const serviceTitle = this.closest('.service-card').querySelector('h3').textContent;
                
                // Crear mensaje personalizado
                const message = `¡Hola! Me interesa el servicio de "${serviceTitle}". ¿Podrían darme más información y un presupuesto?`;
                const encodedMessage = encodeURIComponent(message);
                const phoneNumber = '51951111937'; // Número de WhatsApp
                
                // Abrir WhatsApp
                window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
            });
        });
    }
    
    // ========== BOTÓN COTIZAR MEJORADO ==========
    function initQuoteButton() {
        const quoteButtons = document.querySelectorAll('.quote-btn, .hero .btn');
        
        quoteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Efecto visual
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-3px) scale(1.05)';
                }, 150);
                
                // Scroll suave al contacto
                const contactSection = document.getElementById('contacto');
                if (contactSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = contactSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ========== ENLACES DE REDES SOCIALES ==========
    function initSocialLinks() {
        const socialLinks = document.querySelectorAll('.footer-social a');
        const phoneNumber = '51951111937';
        const email = 'edagarchaynaleon@gmail.com';
        
        socialLinks.forEach(link => {
            const icon = link.querySelector('i');
            
            if (icon.classList.contains('fa-whatsapp')) {
                link.href = `https://wa.me/${phoneNumber}`;
                link.target = '_blank';
            } else if (icon.classList.contains('fa-facebook-f')) {
                link.href = '#';
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('¡Próximamente nuestro Facebook! Por ahora contáctanos por WhatsApp.');
                });
            } else if (icon.classList.contains('fa-instagram')) {
                link.href = '#';
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('¡Próximamente nuestro Instagram! Por ahora contáctanos por WhatsApp.');
                });
            }
        });
    }
    
    // ========== MEJORAR EXPERIENCIA EN MÓVIL ==========
    function initMobileOptimizations() {
        // Prevenir zoom en inputs en iOS
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scal=1.0, maximum-scale=1.0, user-scalable=no';
        
        // Mejorar rendimiento en móvil
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
        }
        
        // Optimizar imágenes lazy loading
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }
    
    // ========== MANEJO DE ERRORES DE IMÁGENES ==========
    function initImageErrorHandling() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                // Si una imagen no carga, mostrar un placeholder
                this.style.backgroundColor = '#f0f0f0';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.style.color = '#999';
                this.style.fontSize = '14px';
                this.alt = 'Imagen no disponible';
            });
        });
    }
    
    // ========== INICIALIZACIÓN ==========
    function init() {
        console.log('🔨 Artech - Carpintería cargada correctamente');
        
        // Inicializar todas las funcionalidades
        initMobileMenu();
        initSmoothScrolling();
        initHeaderScroll();
        initStatsAnimation();
        initScrollAnimations();
        initServiceButtons();
        initQuoteButton();
        initSocialLinks();
        initMobileOptimizations();
        initImageErrorHandling();
        
        // Remover loader si existe
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }
    }
    
    // Ejecutar inicialización
    init();
    
    // ========== UTILIDADES ADICIONALES ==========
    
    // Función para enviar mensaje directo por WhatsApp
    window.sendWhatsAppMessage = function(message) {
        const phoneNumber = '51951111937';
        const encodedMessage = encodeURIComponent(message || '¡Hola! Me interesa sus servicios de carpintería.');
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };
    
    // Función para mostrar/ocultar elementos
    window.toggleElement = function(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.display = element.style.display === 'none' ? 'block' : 'none';
        }
    };
    
    // Función para smooth scroll a cualquier elemento
    window.scrollToElement = function(selector, offset = 80) {
        const element = document.querySelector(selector);
        if (element) {
            const targetPosition = element.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };
});

// ========== EVENT LISTENERS ADICIONALES ==========

// Manejar cambios de orientación en móvil
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.scrollTo(0, window.scrollY + 1);
        window.scrollTo(0, window.scrollY - 1);
    }, 100);
});

// Manejar resize de ventana
window.addEventListener('resize', function() {
    const menu = document.querySelector('.menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (window.innerWidth > 768) {
        menu.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
        document.body.classList.remove('menu-open');
    }
});

// Prevenir errores de consola
window.addEventListener('error', function(e) {
    if (e.filename && e.filename.includes('images/')) {
        console.warn('Imagen no encontrada:', e.filename);
        return true; // Prevenir que se muestre en consola
    }
});