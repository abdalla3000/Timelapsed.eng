        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        cairo: ['Cairo', 'sans-serif'],
                        inter: ['Inter', 'sans-serif']
                    },
                    colors: {
                        brand: {
                            50: '#f0fdf4',
                            100: '#dcfce7',
                            500: '#22c55e',
                            600: '#16a34a',
                            700: '#15803d',
                            900: '#14532d',
                        }
                    }
                }
            }
        }

        // Start date: October 7, 2023 - 00:00:00 local time
        const startDate = new Date(2023, 9, 7, 0, 0, 0); // Month is 0-indexed (9 = Oct)

        function updateCounter() {
            const now = new Date();
            
            // Calculate total difference in milliseconds
            let diffMs = now - startDate;
            
            if (diffMs < 0) {
                diffMs = 0; // Guard clause for dates before start
            }

            // Calculations for exact calendar breakdown (Years, Months, Days)
            let cur = new Date(startDate.getTime());
            
            let years = 0;
            let months = 0;
            let days = 0;

            // Calculate Years
            while (true) {
                let nextYear = new Date(cur);
                nextYear.setFullYear(nextYear.getFullYear() + 1);
                if (nextYear <= now) {
                    years++;
                    cur = nextYear;
                } else {
                    break;
                }
            }

            // Calculate Months
            while (true) {
                let nextMonth = new Date(cur);
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                if (nextMonth <= now) {
                    months++;
                    cur = nextMonth;
                } else {
                    break;
                }
            }

            // Calculate Days
            while (true) {
                let nextDay = new Date(cur);
                nextDay.setDate(nextDay.getDate() + 1);
                if (nextDay <= now) {
                    days++;
                    cur = nextDay;
                } else {
                    break;
                }
            }

            // Remainder hours, minutes, seconds from the remaining time in the current day
            const remainingMs = now - cur;
            const hours = Math.floor(remainingMs / (1000 * 60 * 60));
            const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

            // Total counters
            const totalDaysCalculated = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const totalSecondsCalculated = Math.floor(diffMs / 1000);

            // Update DOM Elements
            document.getElementById('years').textContent = years;
            document.getElementById('months').textContent = months;
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

            document.getElementById('totalDays').textContent = totalDaysCalculated.toLocaleString('ar-EG');
            document.getElementById('totalSeconds').textContent = totalSecondsCalculated.toLocaleString('ar-EG');
        }

        // Dark/Light Theme Switching logic
        const themeToggleBtn = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');

        function initTheme() {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
                themeIcon.className = 'fa-solid fa-sun';
            } else {
                document.documentElement.classList.remove('dark');
                themeIcon.className = 'fa-solid fa-moon';
            }
        }

        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        });

        // Initialize and setup interval
        window.onload = function() {
            initTheme();
            updateCounter();
            setInterval(updateCounter, 1000);
        };