"use strict";


document.addEventListener("DOMContentLoaded", () => {
    // DOM 요소
    const grid = document.getElementById("grid");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const videoModal = document.getElementById("video-modal");
    const videoIframe = document.getElementById("video-iframe");
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle ? themeToggle.querySelector(".theme-icon") : null;
    const loadingScreen = document.getElementById("loading-screen");
    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");

    // 프로젝트 데이터
    const projects = [];
    const addProject = (title, ids, names, poster, videoId, downloadId, git) =>
        projects.push({
            title,
            studentIds: Array.isArray(ids) ? ids : [ids],
            names: Array.isArray(names) ? names : [names],
            poster: poster || "./images/no_image_ChatGPT.png",
            videoId,
            downloadId,
            githubLink: git || ""
        });

    // 프로젝트 데이터 추가
    addProject("리듬파이터", "1988014", "김현우", "", "1swp87zbhiKIm9JPdBuPoW3Iqs5qhcyDy", "14MdtCZa2Nd9tTgaL9w8Ft3LV55tKysEx", "");
    addProject("Twins", "1988019", "박준학", "", "1blsRBpowWcVMjfEYzM17zWYa1vPSl1N9", "1PcuyEHaeBFbP3l0ZKDQ6JD_-Nz1en5ES", "");
    addProject("IN THE DARK", "1988044", "황장민", "./images/1988044_poster.png", "11ZQUFM9OVuHzrNHjJuxHoh887S5f3BOr", "1rriPjbuAw76GKpshN1c1-9ZUYB2nxIGU", "");
    addProject("고기산책로", "2036043", "이선귀", "./images/2036043_poster.png", "1SkvpUW8DWGda9a9NDVbM-WY-B54apZYO", "1yaI90e9Exe2U4Y_AKgWMEhL3ZmR8zhzQ", "https://github.com/sungwidard7/Project_MeatPath.git");
    addProject("Dragon Slayer", ["2088002", "2088018", "2288020"], ["경정찬", "나정원", "윤동욱"], "./images/2088002_2088018_2288020_poster.png", "1bV4_z3aOStQ5l7VFQKMN-zgikvWmN814", "1JxRCfvMWImg6BepkfCMHEq0MZ2P3wAWY", "");
    addProject("AirStrike", "2088005", "권현민", "./images/2088005_poster.png", "1gYbS2bnQtzbmkmBfdDAEJozZ4rw29cR1", "1nWZbS76faY57b3033qtzTj8XEhOTlq0u", "");
    addProject("냥이의 식탁", ["2088011", "2088041"], ["김지유", "정완희"], "./images/2088011_2088041_poster.png", "1x27UkB-AGs6xJZZzWPNJbBRN8OB_H0XF", "1NzCPSAvqkol2fngJhrltF1b8nSrlyiJJ", "https://dhksgml.github.io/NyangsTable/");
    addProject("전탄발사", "2088013", "김진욱", "./images/2088013_poster.png", "1OfqibmH3xb_onV2tX82yylssf2lya-Ge", "1RflnXjKlurPO_zv8JNouNYAROBiiGftz", "");
    addProject("NIGHTFALL RUSH", "2088015", "김찬영", "./images/2088015_poster.png", "1GWb5yj9fZdFCRKwY1C8E2UDrNT8-y0S6", "1YV38NW1xTiisYbLh1k7JwoAxhd9MeUpa", "https://github.com/rlacksdud01/NightFall_Rush");
    addProject("Farm Farm Island", "2088019", "남혁진", "./images/2088019_poster.png", "1SBWK8CRkLA9w9lUMgeLYlozJ-Xje3pl3", "1_VVimr9xz7h7MIsuOP_or9sgCdEpsLSV", "https://github.com/HykJn/Project_FFI");
    addProject("Dungeon Crawl", "2088021", "박상범", "./images/2088021_poster.png", "1M36sBrPeBFsvfu1Cwgr6pJhq8xMN9SUP", "17Ojsn0A6KPX7-MqRxMO3_2QjLqSzkDFm", "https://github.com/WeakSpoter/School-Project.git");
    addProject("BPM: BEATS PER MINUTE", "2088026", "신중훈", "./images/2088026_poster.png", "1XDD0A_VGmlwS64ekQtrkDWI4IFH_2xad", "1x_EI1FU40hfOeVjZ13UytTdrvzZHxuo3", "https://github.com/ShinJooongHooon/BPM");
    addProject("BIG HEAD", "2088030", "윤준서", "./images/2088030_poster.png", "1ObcsYBsceudnWAl6R2cbRyj9-n6oNC-1", "1jfM60Vo-q2YzXDBYbefOkqMitHdfd-th", "");
    addProject("UNDEAD RUSH", "2088035", "장윤호", "./images/2088035_poster.png", "1x3psjjg__b4pjjl5euZ5JUnmaClZ4U-K", "1q45P_3P7yOh5aEQRhDRb_sUzglr8hAn4", "");
    addProject("비연 (PC)", "2088037", "전민성", "./images/2088037_poster.png", "1_d8Ocg1yE7t6yivrn19l65NCdVyeuqi6", "1ZPiPIUztD4HLNh34drlt3jjUnwq3awOd", "https://github.com/JMS2001K/Flying-Swallow/tree/main");
    addProject("A+", "2088044", "최문섭", "./images/2088044_poster.png", "1mWCyKG5psDCVuEiqrggu6An8O0YzlMrT", "1467uaxd7F2bA-mko-KSDPXpItabRcg7_", "");
    addProject("Tele Connect", "2088046", "황인수", "./images/2088046_poster.png", "125yFxSlJ4YKgvzolOVADzEn-Sh7vc-CV", "", "https://github.com/psychicmage/Project-VA-.git");
    addProject("PROJECT-T", "2188045", "노영준", "./images/2188045_poster.jpg", "1iScayp_5OfhAaM-CLWyyPDZO59zFhVSb", "");
    addProject("현대공군대결", "2188802", "최민섭", "./images/2188802_poster.png", "1BnMe8oqRYMM0sIPhoJD-D06F9l6K1990", "19DeC7e6FoIvQNIaG0YVDL3iObX1l6qm_", "https://github.com/f1709/-/blob/main/README.md");
    addProject("Escape from Wizard: Sun & Moon", ["2288014", "2288014"], ["김다희", "남경서"], "./images/2288014_2288014_poster.png", "1lnLCmHVJbPfftTbHTMmD1VA57B-4F9qO", "1MYGC_udgfLUIDPLhcltzay38QiEL_WjM", "");
    addProject("2Dragon -혈무-", ["2288049", "2288012"], ["박건우", "김승석"], "./images/2288049_2288012_poster.png", "1mNoHw4T-92HCpAgpDNzRAsSqUNXwKGpV", "1YkkdzfsyQvBQfBgHC-WE0xXlGkcvjeyS", "https://github.com/Nyam03/2Dragon_Capstone");

    // 프로젝트 카드 생성 함수
    function createProjectCard(project) {
        const hasGithub = project.githubLink && project.githubLink.trim() !== '';
        const isLargeTeam = project.studentIds.length >= 3;
        
        // 멤버 정보 HTML 생성
        let visibleMembersHtml = '';
        let hiddenMembersHtml = '';
        let hiddenCount = 0;
        
        if (isLargeTeam) {
            // 3명 이상이면 처음 2명만 보이게 하고 나머지는 숨김
            const visibleMembers = project.studentIds.slice(0, 2)
                .map((id, i) => `<span class="member-tag">${id} ${project.names[i]}</span>`)
                .join('');
            const hiddenMembers = project.studentIds.slice(2)
                .map((id, i) => `<span class="member-tag hidden-member">${id} ${project.names[i + 2]}</span>`)
                .join('');
            hiddenCount = project.studentIds.length - 2;
            
            visibleMembersHtml = visibleMembers;
            hiddenMembersHtml = hiddenMembers;
        } else {
            // 2명 이하면 모두 보이게
            visibleMembersHtml = project.studentIds
                .map((id, i) => `<span class="member-tag">${id} ${project.names[i]}</span>`)
                .join('');
        }
        
        // 카드 HTML 생성
        const card = document.createElement('div');
        card.className = `project-card ${isLargeTeam ? 'large-team' : ''}`;
        
        // 동적 높이 계산 (기본 120px + 숨겨진 멤버 수 * 35px)
        if (isLargeTeam) {
            const expandedHeight = 120 + (hiddenCount * 35);
            card.style.setProperty('--expanded-height', `${expandedHeight}px`);
        }
        
        card.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-members">
                    ${visibleMembersHtml}
                    ${isLargeTeam ? `<span class="more-members">외 ${hiddenCount}명</span>` : ''}
                    ${hiddenMembersHtml}
                </div>
            </div>
            
            <div class="project-image">
                <img class="thumbnail" src="${project.poster}" alt="${project.title} 포스터" loading="lazy">
                <div class="image-overlay">
                    <span class="zoom-text">포스터 자세히 보기</span>
                </div>
            </div>
            
            <div class="project-actions">
                <div class="action-buttons">
                    <button class="action-btn video-btn" data-video-id="${project.videoId}" ${!project.videoId ? 'disabled title="링크가 없거나 삭제되었습니다!"' : ''}>
                        동영상
                    </button>
                    <button class="action-btn download-btn" data-download-id="${project.downloadId}" ${!project.downloadId ? 'disabled title="링크가 없거나 삭제되었습니다!"' : ''}>
                        다운로드
                    </button>
                    <button class="action-btn github-btn" data-github-link="${project.githubLink}" ${!hasGithub ? 'disabled title="링크가 없거나 삭제되었습니다!"' : ''}>
                        Github
                    </button>
                </div>
            </div>
        `;
        
        // 제목 길이에 따른 폰트 크기 조정
        const titleElement = card.querySelector('.project-title');
        adjustTitleFontSize(titleElement);
        
        return card;
    }

    // 제목 길이에 따른 폰트 크기 자동 조정 함수
    function adjustTitleFontSize(titleElement) {
        const title = titleElement.textContent;
        const titleLength = title.length;
        
        // 제목 길이에 따른 폰트 크기 조정 (더 섬세하게)
        if (titleLength > 28) {
            titleElement.style.fontSize = '1.25rem';
        } else if (titleLength > 22) {
            titleElement.style.fontSize = '1.35rem';
        } else {
            titleElement.style.fontSize = '1.5rem';
        }
    }

    // 프로젝트 렌더링 (성능 최적화된 버전)
    function renderProjects() {
        // DocumentFragment 사용으로 성능 개선
        const fragment = document.createDocumentFragment();
        
        // 모든 카드를 한번에 생성
        projects.forEach(project => {
            const card = createProjectCard(project);
            fragment.appendChild(card);
        });
        
        // 한번에 DOM에 추가
        grid.innerHTML = '';
        grid.appendChild(fragment);
        
        // 부드러운 애니메이션을 위한 지연 실행
        requestAnimationFrame(() => {
            const cards = grid.querySelectorAll('.project-card');
            cards.forEach((card, index) => {
                // 초기 상태를 숨김으로 설정
                card.classList.add('initial-hidden');
                
                // 짧은 지연 후 애니메이션 시작
                setTimeout(() => {
                    card.classList.add('animate-in');
                    card.classList.remove('initial-hidden');
                }, index * 50); // 50ms 간격으로 순차 애니메이션
            });
        });
    }

    // 모달 관련 함수들
    function openLightbox(imageSrc) {
        lightboxImg.src = imageSrc;
        lightbox.style.display = "flex";
    }

    function closeLightbox() {
        lightbox.style.display = "none";
        lightboxImg.src = "";
    }

    function openVideoModal(videoId) {
        if (!videoId) {
            alert("동영상이 제출되지 않았습니다.");
            return;
        }
        videoIframe.src = `https://drive.google.com/file/d/${videoId}/preview`;
        videoModal.style.display = "flex";
    }

    function closeVideoModal() {
        videoModal.style.display = "none";
        videoIframe.src = "";
    }

    function downloadFile(fileId) {
        if (!fileId) {
            alert("파일이 제출되지 않았습니다.");
            return;
        }
        window.open(`https://drive.google.com/uc?export=download&id=${fileId}`, "_blank");
    }

    function openGithub(githubLink) {
        if (githubLink) {
            window.open(githubLink, "_blank");
        }
    }

    // 다크 모드 관련 함수들
    function initTheme() {
        // localStorage에서 테마 설정 불러오기
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // 저장된 테마가 있으면 사용, 없으면 시스템 설정 따름
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        
        setTheme(initialTheme);
    }

    function setTheme(theme) {
        console.log('Setting theme to:', theme); // 디버깅용
        document.documentElement.setAttribute('data-theme', theme);
        
        // 아이콘 변경
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.textContent = '☀'; // 다크모드일 때 태양 아이콘 (라이트모드로 전환 가능)
            } else {
                themeIcon.textContent = '☾'; // 라이트모드일 때 달 아이콘 (다크모드로 전환 가능)
            }
        }
        
        // localStorage에 테마 저장
        localStorage.setItem('theme', theme);
    }

    function toggleTheme() {
        console.log('Toggle theme clicked'); // 디버깅용
        const currentTheme = document.documentElement.getAttribute('data-theme');
        console.log('Current theme:', currentTheme); // 디버깅용
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        console.log('New theme:', newTheme); // 디버깅용
        setTheme(newTheme);
    }

    // 이벤트 핸들러 설정
    function setupEventHandlers() {
        // 이벤트 위임을 사용한 클릭 핸들러
        document.addEventListener('click', (e) => {
            // 썸네일 클릭 - 라이트박스 열기
            if (e.target.matches('.thumbnail') || e.target.closest('.image-overlay')) {
                const thumbnail = e.target.matches('.thumbnail') 
                    ? e.target 
                    : e.target.closest('.project-image').querySelector('.thumbnail');
                openLightbox(thumbnail.src);
            }
            
            // 라이트박스 닫기
            else if (e.target.matches('#lightbox-close') || (e.target.matches('#lightbox') && e.target === e.currentTarget)) {
                closeLightbox();
            }
            
            // 동영상 버튼 클릭
            else if (e.target.matches('.video-btn') && !e.target.disabled) {
                const videoId = e.target.dataset.videoId;
                openVideoModal(videoId);
            }
            
            // 비디오 모달 닫기
            else if (e.target.matches('#video-close') || e.target.matches('.modal-backdrop')) {
                closeVideoModal();
            }
            
            // 다운로드 버튼 클릭
            else if (e.target.matches('.download-btn') && !e.target.disabled) {
                const downloadId = e.target.dataset.downloadId;
                downloadFile(downloadId);
            }
            
            // Github 버튼 클릭
            else if (e.target.matches('.github-btn')) {
                const githubLink = e.target.dataset.githubLink;
                openGithub(githubLink);
            }
            
            // 테마 토글 버튼 클릭
            else if (e.target.matches('#theme-toggle') || e.target.closest('#theme-toggle')) {
                console.log('Theme toggle button clicked'); // 디버깅용
                toggleTheme();
            }
        });

        // 키보드 이벤트 - ESC로 모달 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (lightbox.style.display === 'flex') {
                    closeLightbox();
                } else if (videoModal.style.display === 'flex') {
                    closeVideoModal();
                }
            }
        });
    }

    // 성능 최적화를 위한 디바운스 함수
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 시스템 테마 변경 감지
    function watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // 사용자가 수동으로 설정하지 않았을 때만 시스템 설정 따름
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // 이미지 프리로딩 함수
    function preloadImages() {
        return new Promise((resolve) => {
            const imageUrls = projects
                .map(project => project.poster)
                .filter(poster => poster && poster.trim() !== "" && poster !== "./images/no_image_ChatGPT.png");
            
            if (imageUrls.length === 0) {
                resolve();
                return;
            }

            let loadedCount = 0;
            const totalCount = imageUrls.length;
            
            // 진행률 업데이트
            function updateProgress() {
                const progress = (loadedCount / totalCount) * 100;
                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${loadedCount} / ${totalCount}`;
            }
            
            updateProgress();
            
            const loadPromises = imageUrls.map(url => {
                return new Promise((imageResolve) => {
                    const img = new Image();
                    let resolved = false;
                    
                    const onLoad = () => {
                        if (!resolved) {
                            resolved = true;
                            loadedCount++;
                            updateProgress();
                            img.removeEventListener('load', onLoad);
                            img.removeEventListener('error', onError);
                            imageResolve();
                        }
                    };
                    
                    const onError = () => {
                        if (!resolved) {
                            resolved = true;
                            console.warn(`Failed to load image: ${url}`);
                            loadedCount++;
                            updateProgress();
                            img.removeEventListener('load', onLoad);
                            img.removeEventListener('error', onError);
                            imageResolve();
                        }
                    };
                    
                    img.addEventListener('load', onLoad);
                    img.addEventListener('error', onError);
                    
                    // 타임아웃 설정 (5초로 단축)
                    const timeout = setTimeout(() => {
                        if (!resolved) {
                            console.warn(`Timeout loading image: ${url}`);
                            onError();
                        }
                    }, 5000);
                    
                    img.src = url;
                });
            });
            
            // 전체 로딩에 대한 타임아웃 설정 (15초)
            const globalTimeout = setTimeout(() => {
                console.warn('Global timeout: Force resolving preloadImages');
                resolve();
            }, 15000);

            Promise.all(loadPromises).then(() => {
                clearTimeout(globalTimeout);
                // 모든 이미지 로딩 완료 후 잠시 대기
                setTimeout(resolve, 500);
            }).catch((error) => {
                clearTimeout(globalTimeout);
                console.warn('Error in Promise.all:', error);
                resolve(); // 에러가 발생해도 계속 진행
            });
        });
    }

    // 로딩 화면 숨기기
    function hideLoadingScreen() {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            // 애니메이션 완료 후 display none
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    // 초기화
    async function init() {
        // 테마 초기화 (가장 먼저 실행)
        initTheme();
        watchSystemTheme();
        
        // 테마 토글 버튼에 직접 이벤트 리스너 추가
        if (themeToggle) {
            console.log('Adding event listener to theme toggle'); // 디버깅용
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Direct theme toggle clicked'); // 디버깅용
                toggleTheme();
            });
        } else {
            console.log('Theme toggle button not found!'); // 디버깅용
        }
        
        // 프로젝트 렌더링
        renderProjects();
        setupEventHandlers();
        
        // 이미지 프리로딩
        try {
            await preloadImages();
            console.log('All images loaded successfully');
        } catch (error) {
            console.warn('Error during image preloading:', error);
        }
        
        // 로딩 화면 숨기기
        hideLoadingScreen();
        
        // 스크롤 성능 최적화
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // 스크롤 관련 최적화 작업이 있다면 여기에
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // 폰트 로딩 완료 후 초기화
    if (document.fonts) {
        document.fonts.ready.then(init);
    } else {
        // 폰트 로딩을 기다리지 않고 즉시 초기화
        setTimeout(init, 0);
    }
});