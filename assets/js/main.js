/**
* Template Name: DevFolio
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
               
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
               
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// game
(function(){
    // ----- DOM refs -----
    const boardEl = document.getElementById('board');
    const turnBadge = document.getElementById('turnBadge');
    const statusMsg = document.getElementById('statusMessage');
    const humanScoreSpan = document.getElementById('humanScore');
    const aiScoreSpan = document.getElementById('aiScore');
    const drawScoreSpan = document.getElementById('drawScore');

    // ----- state -----
    let board = Array(9).fill(null);
    let currentPlayer = 'X';          // X = human, O = AI
    let gameActive = true;
    let winnerInfo = null;            
    let scores = { human: 0, ai: 0, draw: 0 };
    let autoResetTimer = null;        // timer for auto‑rematch

    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    // ----- joke pool -----
    const jokes = {
      aiWin: [
        '🤖 You tried, but I am inevitable!', 
        '🧠 Better luck next time, human!',
        '⚡ You lost to a bunch of code. Ouch!',
        '😏 I have calculated your defeat.',
        '💪 AI power! You never stood a chance.'
      ],
      humanWin: [
        '🎉 You beat me this time, but I\'ll be back!',
        '😤 Lucky move! I\'ll remember this.',
        '🌟 Okay, you win. This time.',
        '🔄 I’ll recalculate and return stronger.',
        '🧐 Impressive. But I learn from every loss.'
      ],
      draw: [
        '🤝 A draw! We are evenly matched.',
        '⚖️ Stalemate. How boringly balanced.',
        '😶 Neither wins. How anticlimactic.',
        '🔄 A tie? I demand a rematch!',
        '🤷‍♂️ Draw. Let\'s pretend that didn\'t happen.'
      ]
    };

    function getRandomJoke(type) {
      const arr = jokes[type] || jokes.draw;
      return arr[Math.floor(Math.random() * arr.length)];
    }

    // ----- render functions -----
    function createBoardCells() {
      boardEl.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.addEventListener('click', cellClickHandler);
        boardEl.appendChild(cell);
      }
    }
    createBoardCells();

    function getCells() { return boardEl.children; }

    function renderBoard() {
      const cells = getCells();
      for (let i = 0; i < 9; i++) {
        const cell = cells[i];
        const val = board[i];
        cell.textContent = val || '';
        cell.classList.remove('x-move', 'o-move', 'win-highlight', 'disabled');
        if (val === 'X') cell.classList.add('x-move');
        else if (val === 'O') cell.classList.add('o-move');
        if (!gameActive || val !== null) cell.classList.add('disabled');
      }

      if (winnerInfo && winnerInfo.winCombo) {
        const cells = getCells();
        for (let idx of winnerInfo.winCombo) {
          cells[idx].classList.add('win-highlight');
        }
      }
      updateUI();
    }

    function updateUI() {
      // turn badge
      if (!gameActive) {
        if (winnerInfo && winnerInfo.winner) {
          turnBadge.textContent = winnerInfo.winner;
          turnBadge.className = `turn-badge ${winnerInfo.winner === 'X' ? 'x-turn' : 'o-turn'}`;
        } else {
          turnBadge.textContent = '—';
          turnBadge.className = 'turn-badge';
        }
      } else {
        turnBadge.textContent = currentPlayer;
        turnBadge.className = `turn-badge ${currentPlayer === 'X' ? 'x-turn' : 'o-turn'}`;
      }

      // scores
      humanScoreSpan.textContent = scores.human;
      aiScoreSpan.textContent = scores.ai;
      drawScoreSpan.textContent = scores.draw;

      // message + jokes
      if (!gameActive) {
        if (winnerInfo && winnerInfo.winner === 'X') {
          const joke = getRandomJoke('humanWin');
          statusMsg.innerHTML = `<span class="emoji-big">🏆</span> You win! ${joke}`;
        } else if (winnerInfo && winnerInfo.winner === 'O') {
          const joke = getRandomJoke('aiWin');
          statusMsg.innerHTML = `<span class="emoji-big">🤖</span> AI wins! ${joke}`;
        } else {
          const joke = getRandomJoke('draw');
          statusMsg.innerHTML = `<span class="emoji-big">⚖️</span> Draw! ${joke}`;
        }
        // schedule auto‑reset after 2.5 seconds
        if (autoResetTimer) clearTimeout(autoResetTimer);
        autoResetTimer = setTimeout(() => {
          resetGame();
        }, 2500);
      } else {
        if (currentPlayer === 'X') {
          statusMsg.innerHTML = `<span class="emoji-big">⏳</span> Your turn (X)`;
        } else {
          statusMsg.innerHTML = `<span class="emoji-big">🤖</span> AI is thinking...`;
        }
      }
    }

    // ----- game logic -----
    function checkGameStatus() {
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          winnerInfo = { winner: board[a], winCombo: pattern };
          gameActive = false;
          if (winnerInfo.winner === 'X') scores.human += 1;
          else if (winnerInfo.winner === 'O') scores.ai += 1;
          renderBoard();
          return true;
        }
      }

      if (board.every(cell => cell !== null)) {
        winnerInfo = null;
        gameActive = false;
        scores.draw += 1;
        renderBoard();
        return true;
      }

      winnerInfo = null;
      return false;
    }

    // ----- AI move (minimax‑like: win / block / center / corner / random) -----
    function aiMove() {
      if (!gameActive) return;
      if (currentPlayer !== 'O') return;
      if (board.every(cell => cell !== null)) return;

      // 1. win
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const vals = [board[a], board[b], board[c]];
        const countO = vals.filter(v => v === 'O').length;
        const countNull = vals.filter(v => v === null).length;
        if (countO === 2 && countNull === 1) {
          const idx = pattern[vals.indexOf(null)];
          makeMove(idx, 'O');
          return;
        }
      }

      // 2. block human win
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const vals = [board[a], board[b], board[c]];
        const countX = vals.filter(v => v === 'X').length;
        const countNull = vals.filter(v => v === null).length;
        if (countX === 2 && countNull === 1) {
          const idx = pattern[vals.indexOf(null)];
          makeMove(idx, 'O');
          return;
        }
      }

      // 3. center
      if (board[4] === null) {
        makeMove(4, 'O');
        return;
      }

      // 4. corners
      const corners = [0, 2, 6, 8];
      const availableCorners = corners.filter(i => board[i] === null);
      if (availableCorners.length > 0) {
        const idx = availableCorners[Math.floor(Math.random() * availableCorners.length)];
        makeMove(idx, 'O');
        return;
      }

      // 5. any remaining
      const available = board.reduce((acc, cell, idx) => cell === null ? [...acc, idx] : acc, []);
      if (available.length > 0) {
        const idx = available[Math.floor(Math.random() * available.length)];
        makeMove(idx, 'O');
      }
    }

    function makeMove(index, player) {
      if (!gameActive) return false;
      if (board[index] !== null) return false;
      if (player !== currentPlayer) return false;

      board[index] = player;
      renderBoard();

      const ended = checkGameStatus();
      if (!ended) {
        currentPlayer = (currentPlayer === 'X' ? 'O' : 'X');
        renderBoard();
        if (gameActive && currentPlayer === 'O') {
          // slight delay for AI move
          setTimeout(() => { aiMove(); }, 150);
        }
      } else {
        // game ended, auto‑reset is scheduled in updateUI
      }
      return true;
    }

    // ----- human click handler -----
    function cellClickHandler(e) {
      if (!gameActive) return;
      if (currentPlayer !== 'X') return;
      const cell = e.currentTarget;
      const index = parseInt(cell.dataset.index, 10);
      if (board[index] !== null) return;

      makeMove(index, 'X');
    }

    // ----- reset game (preserve scores) -----
    function resetGame() {
      if (autoResetTimer) {
        clearTimeout(autoResetTimer);
        autoResetTimer = null;
      }
      board = Array(9).fill(null);
      currentPlayer = 'X';
      gameActive = true;
      winnerInfo = null;
      const cells = getCells();
      for (let i = 0; i < 9; i++) {
        const cell = cells[i];
        cell.textContent = '';
        cell.classList.remove('x-move', 'o-move', 'win-highlight', 'disabled');
      }
      renderBoard();
      statusMsg.innerHTML = `<span class="emoji-big">👌</span> You go first (X)`;
      turnBadge.textContent = 'X';
      turnBadge.className = 'turn-badge x-turn';
    }

    // ----- reset button (also resets scores) -----
    function fullReset() {
      if (autoResetTimer) {
        clearTimeout(autoResetTimer);
        autoResetTimer = null;
      }
      scores = { human: 0, ai: 0, draw: 0 };
      resetGame();
    }

    document.getElementById('resetBtn').addEventListener('click', fullReset);

    // initial render
    resetGame();
  })();