document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // DARK MODE TOGGLE (Consistent across both pages)
    // =============================================
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Initialize dark mode from localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }
    
    // Dark mode toggle handler
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', this.checked ? 'enabled' : 'disabled');
        });
    }

    // =============================================
    // HAMBURGER MENU (Fixed for both pages)
    // =============================================
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    
    if (hamburgerMenu && sidebar && sidebarOverlay) {
        hamburgerMenu.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            sidebarOverlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
        });

        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            this.style.display = 'none';
        });
    }

    // =============================================
    // SERVICE CARDS AND MODAL (Dashboard functionality)
    // =============================================
    const serviceCards = document.querySelectorAll('.service-card');
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const closeModal = document.querySelector('.close-modal');
    
    if (serviceCards.length && modal) {
        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                const service = this.getAttribute('data-service');
                let title = '';
                
                switch(service) {
                    case 'airtime':
                        title = 'Airtime Recharge';
                        break;
                    case 'data':
                        title = 'Data Bundle Purchase';
                        break;
                    case 'electricity':
                        title = 'Electricity Bill Payment';
                        break;
                    case 'cable':
                        title = 'Cable TV Subscription';
                        break;
                    case 'airtime-cash':
                        title = 'Airtime to Cash Conversion';
                        break;
                    default:
                        title = 'Service';
                }
                
                modalTitle.textContent = title;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Quick amount buttons
        const quickAmounts = document.querySelectorAll('.quick-amount');
        const amountInput = document.getElementById('amount');
        
        quickAmounts.forEach(button => {
            button.addEventListener('click', function() {
                const amount = this.textContent.replace('₦', '').replace(',', '');
                amountInput.value = amount;
            });
        });
        
        // Form submission
        const serviceForm = document.getElementById('serviceForm');
        
        if (serviceForm) {
            serviceForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const network = document.getElementById('network').value;
                const phone = document.getElementById('phone').value;
                const amount = document.getElementById('amount').value;
                
                // Validate form
                if (!network || !phone || !amount) {
                    alert('Please fill in all fields');
                    return;
                }
                
                // Simulate successful transaction
                alert(`Transaction successful!\n\nNetwork: ${network}\nPhone: ${phone}\nAmount: ₦${amount}`);
                
                // Close modal and reset form
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                this.reset();
            });
        }
    }

    // =============================================
    // PROMO CAROUSEL (Dashboard functionality)
    // =============================================
    const slides = document.querySelectorAll('.promo-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length && dots.length) {
        let currentSlide = 0;
        
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Auto-rotate slides every 5 seconds
        setInterval(nextSlide, 5000);
        
        // Click on dots to navigate
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
    }

    // =============================================
    // TRANSACTION SLIDER (Dashboard functionality)
    // =============================================
    const sliderTrack = document.querySelector('.slider-track');
    
    if (sliderTrack) {
        // Sample transaction data
        const transactions = [
            {
                id: "VTU78945",
                type: "Airtime (MTN)",
                amount: "₦1,000.00",
                time: "10 mins ago",
                status: "completed",
                icon: "fa-mobile-alt"
            },
            {
                id: "VTU78944",
                type: "Data (Airtel)",
                amount: "₦2,500.00",
                time: "25 mins ago",
                status: "completed",
                icon: "fa-database"
            },
            {
                id: "VTU78943",
                type: "Electricity",
                amount: "₦5,000.00",
                time: "1 hour ago",
                status: "pending",
                icon: "fa-lightbulb"
            },
            {
                id: "VTU78942",
                type: "DStv Subscription",
                amount: "₦9,800.00",
                time: "3 hours ago",
                status: "failed",
                icon: "fa-tv"
            }
        ];

        let currentIndex = 0;
        let autoSlideInterval;
        const itemHeight = 84; // Approximate height of one item with margin

        // Initialize slider with transactions
        function initSlider() {
            // Clear existing items
            sliderTrack.innerHTML = '';
            
            // Create transaction items
            transactions.forEach((txn, index) => {
                const item = document.createElement('div');
                item.className = `transaction-item ${txn.status}`;
                item.setAttribute('data-id', txn.id);
                
                item.innerHTML = `
                    <div class="item-icon">
                        <i class="fas ${txn.icon}"></i>
                    </div>
                    <div class="item-details">
                        <div class="item-main">
                            <h4>${txn.type}</h4>
                            <span class="amount">${txn.amount}</span>
                        </div>
                        <div class="item-meta">
                            <span class="time">${txn.time}</span>
                            <span class="status-badge ${txn.status}">${txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}</span>
                        </div>
                    </div>
                    <i class="fas fa-chevron-right arrow"></i>
                `;
                
                // Stagger animation
                item.style.animationDelay = `${index * 0.1}s`;
                
                sliderTrack.appendChild(item);
                
                // Add click handler
                item.addEventListener('click', function() {
                    alert(`Viewing details for transaction ${txn.id}`);
                });
            });
            
            // Clone first few items for seamless looping
            for (let i = 0; i < 2; i++) {
                const clone = sliderTrack.children[i].cloneNode(true);
                sliderTrack.appendChild(clone);
            }
        }

        // Animate slider upward
        function slideUp() {
            currentIndex++;
            const newPosition = -currentIndex * itemHeight;
            sliderTrack.style.transform = `translateY(${newPosition}px)`;
            
            // When we reach the cloned items, reset seamlessly
            if (currentIndex >= transactions.length) {
                setTimeout(() => {
                    sliderTrack.style.transition = 'none';
                    currentIndex = 0;
                    sliderTrack.style.transform = 'translateY(0)';
                    // Force reflow
                    void sliderTrack.offsetWidth;
                    sliderTrack.style.transition = 'transform 0.7s ease';
                }, 700);
            }
        }

        // Start auto-slide
        function startAutoSlide() {
            autoSlideInterval = setInterval(slideUp, 3000);
        }

        // Pause on hover
        sliderTrack.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        sliderTrack.addEventListener('mouseleave', startAutoSlide);

        // View All click handler
        const viewAllBtn = document.querySelector('.view-all');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Redirecting to full transactions page');
            });
        }

        // Initialize and start the slider
        initSlider();
        startAutoSlide();
    }

    // =============================================
    // CHAT FUNCTIONALITY (Both pages)
    // =============================================
    const chatFab = document.querySelector('.chat-fab');
    if (chatFab) {
        const chatIcon = document.querySelector('.chat-icon');
        const closeChat = document.querySelector('.close-chat');
        
        // Toggle chat window
        if (chatIcon) {
            chatIcon.addEventListener('click', function() {
                chatFab.classList.toggle('active');
            });
        }
        
        // Close chat window
        if (closeChat) {
            closeChat.addEventListener('click', function() {
                chatFab.classList.remove('active');
            });
        }

        // Show wealth popup after successful login
function showWealthPopup() {
    const popup = document.getElementById('wealthPopup');
    if (popup) {
      popup.style.display = 'flex';
      
      // Close button
      const closeBtn = popup.querySelector('.wealth-popup-close');
      closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
      });
      
      // Close when clicking outside
      popup.addEventListener('click', (e) => {
        if (e.target === popup) {
          popup.style.display = 'none';
        }
      });
    }
  }
  
  // Call this after successful login
   showWealthPopup();
        
        // Send message functionality
        const chatInput = document.querySelector('.chat-input input');
        const sendBtn = document.querySelector('.send-btn');
        const chatMessages = document.querySelector('.chat-messages');
        
        function sendMessage() {
            const messageText = chatInput.value.trim();
            if (messageText) {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message sent';
                messageDiv.innerHTML = `
                    <p>${messageText}</p>
                    <span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                `;
                chatMessages.appendChild(messageDiv);
                chatInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate reply after 1 second
                setTimeout(() => {
                    const replyDiv = document.createElement('div');
                    replyDiv.className = 'message received';
                    replyDiv.innerHTML = `
                        <p>Thanks for your message! Our team will respond shortly.</p>
                        <span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    `;
                    chatMessages.appendChild(replyDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        }
        
        if (sendBtn && chatInput) {
            sendBtn.addEventListener('click', sendMessage);
            
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!chatFab.contains(e.target) && chatFab.classList.contains('active')) {
                chatFab.classList.remove('active');
            }
        });
    }

    // =============================================
    // REFERRAL FUNCTIONALITY (Referral page)
    // =============================================
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', function() {
            const code = document.querySelector('.referral-code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i> Copy Code';
                }, 2000);
            });
        });
    }

    const copyLinkBtn = document.getElementById('copyLinkBtn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function() {
            const link = document.getElementById('referralLink').value;
            navigator.clipboard.writeText(link).then(() => {
                this.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
    }

    // =============================================
    // LOGOUT FUNCTIONALITY (Both pages)
    // =============================================
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function() {
            // Replace with your actual logout logic
            alert('Logging out...');
            window.location.href = 'index.html';
            
            // Example with Supabase (uncomment if using Supabase)
            /*
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error logging out:', error);
            } else {
                window.location.href = 'index.html';
            }
            */
        });
    }
});