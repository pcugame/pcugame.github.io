"use strict";

document.addEventListener("DOMContentLoaded", function()
{
	const lightbox = document.getElementById("lightbox");
	const lightboxImg = document.getElementById("lightbox-img");
	const lightboxClose = document.getElementById("lightbox-close");

	const videoModal = document.getElementById("video-modal");
	const videoIframe = document.getElementById("video-iframe");
	const videoClose = document.getElementById("video-close");

    const projects = [];

    // videoId와 downloadId는 구글 드라이브 링크를 기준으로 합니다.
    // 클릭시 구글 드라이브로 이동되는 것이 아닌 즉시 다운로드 하기 위한 방식입니다.
    // 예: https://drive.google.com/file/d/1rriPjbuAw76GKpshN1c1-9ZUYB2nxIGU/view?usp=drive_link의 경우 Id는 1rriPjbuAw76GKpshN1c1-9ZUYB2nxIGU (/d/이후부터 /view 이전까지)입니다.
    function addProject(title, studentIds, names, poster, videoId, downloadId, githubLink)
    {
        projects.push
        ({
            title: title,
            // 배열인지 아닌지만 판별하는 단순한 삼항연산입니다.
            // 여러명의 공동작업일 경우에는 ["aaa의 학번", "bbb의 학번"], ["aaa", "bbb"]의 형태로 호출하세요.
            studentIds: Array.isArray(studentIds) ? studentIds : [studentIds],
            names: Array.isArray(names) ? names : [names],
            poster: poster || '/images/no_image_ChatGPT.png', // 안 넣을시 노이미지가 출력됩니다.
            videoId: videoId,
            downloadId: downloadId,
            githubLink: githubLink || ""
        });
    }

    // 작품 하나하나마다 이렇게 해서 추가하면 좋습니다. HTML을 무한히 늘리지 마세요.
    // TODO: 입력받은 학번에 맞는 파일을 알아서 찾게 수정하고 싶음.
    addProject("리듬파이터", "1988014", "김현우", "", "1swp87zbhiKIm9JPdBuPoW3Iqs5qhcyDy", "14MdtCZa2Nd9tTgaL9w8Ft3LV55tKysEx", "");
    addProject("IN THE DARK", "1988044", "황장민", "/images/1988044_poster.png", "", "1rriPjbuAw76GKpshN1c1-9ZUYB2nxIGU", "");
    addProject("고기산책로", "2036043", "이선귀", "/images/2036043_poster.png", "1SkvpUW8DWGda9a9NDVbM-WY-B54apZYO", "1yaI90e9Exe2U4Y_AKgWMEhL3ZmR8zhzQ", "https://github.com/sungwidard7/Project_MeatPath.git");
    addProject("Dungeon Slayer", ["2088002", "2088018", "2288020"], ["경정찬", "나정원", "윤동욱"], "", "1bV4_z3aOStQ5l7VFQKMN-zgikvWmN814", "1JxRCfvMWImg6BepkfCMHEq0MZ2P3wAWY", "");
    addProject("AirStrike", "2088005", "권현민", "/images/2088005_poster.png", "1gYbS2bnQtzbmkmBfdDAEJozZ4rw29cR1", "1nWZbS76faY57b3033qtzTj8XEhOTlq0u", "");
    addProject("냥이의 식탁", ["2088011", "2088041"], ["김지유", "정완희"], "/images/2088011_2088041_poster.png", "1x27UkB-AGs6xJZZzWPNJbBRN8OB_H0XF", "1NzCPSAvqkol2fngJhrltF1b8nSrlyiJJ", "https://dhksgml.github.io/NyangsTable/");
	addProject("전탄발사", "2088013", "김진욱", "/images/2088013_poster.png", "1OfqibmH3xb_onV2tX82yylssf2lya-Ge", "1RflnXjKlurPO_zv8JNouNYAROBiiGftz", "")
    addProject("NIGHTFALL RUSH", "2088015", "김찬영", "/images/2088015_poster.png", "1GWb5yj9fZdFCRKwY1C8E2UDrNT8-y0S6", "1YV38NW1xTiisYbLh1k7JwoAxhd9MeUpa", "https://github.com/rlacksdud01/NightFall_Rush");
	addProject("Farm Farm Island", "2088019", "남혁진", "/images/2088019_poster.png", "1SBWK8CRkLA9w9lUMgeLYlozJ-Xje3pl3", "1_VVimr9xz7h7MIsuOP_or9sgCdEpsLSV", "https://github.com/HykJn/Project_FFI");
    addProject("Dungeon Crawl", "2088021", "박상범", "/images/2088021_poster.png", "1M36sBrPeBFsvfu1Cwgr6pJhq8xMN9SUP", "17Ojsn0A6KPX7-MqRxMO3_2QjLqSzkDFm", "https://github.com/WeakSpoter/School-Project.git");
    addProject("BPM: BEATS PER MINUTE", "2088026", "신중훈", "/images/2088026_poster.png", "1XDD0A_VGmlwS64ekQtrkDWI4IFH_2xad", "1x_EI1FU40hfOeVjZ13UytTdrvzZHxuo3", "https://github.com/ShinJooongHooon/BPM");
    addProject("BIG HEAD", "2088030", "윤준서", "/images/2088030_poster.png", "1ObcsYBsceudnWAl6R2cbRyj9-n6oNC-1", "1emQHqlEArlhj3s7jmxwckZKtMS6TgCxS", "");
    addProject("UNDEAD RUSH", "2088035", "장윤호", "/images/2088035_poster.png", "1x3psjjg__b4pjjl5euZ5JUnmaClZ4U-K", "1q45P_3P7yOh5aEQRhDRb_sUzglr8hAn4", "");
    addProject("비연 (PC)", "2088037", "전민성", "/images/2088037_poster.png", "1_d8Ocg1yE7t6yivrn19l65NCdVyeuqi6", "1ZPiPIUztD4HLNh34drlt3jjUnwq3awOd", "https://github.com/JMS2001K/Flying-Swallow/tree/main");
    addProject("A+", "2088044", "최문섭", "/images/2088044_poster.png", "1mWCyKG5psDCVuEiqrggu6An8O0YzlMrT", "1467uaxd7F2bA-mko-KSDPXpItabRcg7_", "");
    addProject("Tele Connect", "2088046", "황인수", "/images/2088046_poster.png", "125yFxSlJ4YKgvzolOVADzEn-Sh7vc-CV", "", "https://github.com/psychicmage/Project-VA-.git");
	addProject("PROJECT-T", "2188045", "노영준", "/images/2188045_poster.jpg", "1iScayp_5OfhAaM-CLWyyPDZO59zFhVSb", "")
    addProject("현대공군대결", "2188802", "최민섭", "/images/2188802_poster.png", "1BnMe8oqRYMM0sIPhoJD-D06F9l6K1990", "19DeC7e6FoIvQNIaG0YVDL3iObX1l6qm_", "https://github.com/f1709/-/blob/main/README.md");
    addProject("Escape from Wizard: Sun & Moon", ["2288014", "2288014"], ["김다희", "남경서"], "/images/2288014_2288014_poster.png", "1lnLCmHVJbPfftTbHTMmD1VA57B-4F9qO", "1MYGC_udgfLUIDPLhcltzay38QiEL_WjM", "");
    addProject("2Dragon -혈무-", ["2288049", "2288012"], ["박건우", "김승석"], "/images/2288049_2288012_poster.png", "1mNoHw4T-92HCpAgpDNzRAsSqUNXwKGpV", "1YkkdzfsyQvBQfBgHC-WE0xXlGkcvjeyS", "https://github.com/Nyam03/2Dragon_Capstone");

const grid = document.getElementById("grid");

projects.forEach(function(proj)
{
	let itemWrapper = document.createElement("div");
	itemWrapper.className = "item";

	let nameCount = proj.names.length;
	let nameFontSize = nameCount >= 3 ? "12px" : "14px";
	let titleLength = proj.title.length;
	let titleFontSize = titleLength >= 22 ? "16px" : "18px";

	itemWrapper.innerHTML = `
				<div class="subtitle">
					<div style="
						font-weight: bold;
						font-size: ${titleFontSize};
						text-align: center;
					">
						${proj.title}
					</div>
					<div style="
						font-size: ${nameFontSize};
						text-align: center;
						color: #555;
						white-space: nowrap;
						overflow: visible;
						text-overflow: unset;
					">
						${proj.studentIds.map((id, i) => `${id} ${proj.names[i]}`).join(" | ")}
					</div>
				</div>
				<img class="thumbnail" src="${proj.poster}" alt="포스터">
				<div class="buttons">
					<button class="video-btn" data-video-id="${proj.videoId}">동영상</button>
					<button class="download-btn" data-download-id="${proj.downloadId}">다운로드</button>
					${proj.githubLink ? `<button class="github-btn" data-github-link="${proj.githubLink}">Github</button>`: ``}
				</div>`;

	grid.appendChild(itemWrapper);
});

	document.querySelectorAll(".thumbnail").forEach(function(img)
	{
		img.addEventListener("click", function()
		{
			lightboxImg.src = this.src;
			lightbox.style.display = "flex";
		});
	});

	lightboxClose.addEventListener("click", function()
	{
		lightbox.style.display = "none";
		lightboxImg.src = "";
	});

	document.addEventListener("keydown", function(e)
	{
		if (e.key === "Escape" && lightbox.style.display === "flex")
		{
			lightbox.style.display = "none";
			lightboxImg.src = "";
		}
	});

	document.querySelectorAll(".video-btn").forEach(function(btn)
	{
		btn.addEventListener("click", function()
		{
			const fileId = this.dataset.videoId;
			if (!fileId)
			{
				alert("동영상이 제출되지 않았습니다.");
				return;
			}

			const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
			videoIframe.src = embedUrl;
			videoModal.style.display = "flex";
		});
	});

	videoClose.addEventListener("click", function()
	{
		videoModal.style.display = "none";
		videoIframe.src = "";
	});

	document.addEventListener("keydown", function(e)
	{
		if (e.key === "Escape" && videoModal.style.display === "flex")
		{
			videoModal.style.display = "none";
			videoIframe.src = "";
		}
	});

	document.querySelectorAll(".download-btn").forEach(function(btn)
	{
		let fileId = btn.dataset.downloadId;

        btn.addEventListener("click", function()
        {
            if (!fileId)
            {
                alert("파일이 제출되지 않았습니다.");
                return;
            }

            let url = "https://drive.google.com/uc?export=download&id=" + fileId;

            window.open(url, "_blank");
        });
	});

		document.querySelectorAll(".github-btn").forEach(function(btn)
	{
        btn.addEventListener("click", function()
        {
			const githubLink = this.dataset.githubLink;

            /* if (!githubLink) 버튼 표시를 안하는 방향으로 변경.
            {
                alert("Github 주소가 제출되지 않았습니다.");
                return;
            } */

            let url = githubLink;

            window.open(url, "_blank");
        });
	});

	// 페이지 관련부분, 페이지를 없애고 아래로 스크롤하게 변경.
	/* const items = Array.from(document.querySelectorAll(".item"));
	const itemsPerPage = 8;
	const pageCount = Math.ceil(items.length / itemsPerPage);
	const paginationContainer = document.getElementById("pagination");

	let currentPage = 1;

	function showPage(page)
	{
		const start = (page - 1) * itemsPerPage;
		const end = start + itemsPerPage;

		items.forEach((item, index) =>
		{
			item.style.display = (index >= start && index < end) ? "flex" : "none";
		});

        const indicator = document.getElementById("page-indicator");
        if (indicator)
            indicator.textContent = `${page} / ${pageCount}`;
	}

    function updatePaginationIndicator()
    {
        const indicator = document.getElementById("page-indicator");
        indicator.textContent = `${currentPage} / ${pageCount}`;
    }

    function setupArrowPagination()
    {
        const prevBtn = document.getElementById("prev-page");
        const nextBtn = document.getElementById("next-page");

        prevBtn.addEventListener("click", function()
        {
            if (currentPage > 1)
            {
                currentPage--;
                showPage(currentPage);
                updatePaginationIndicator();
            }
        });

        nextBtn.addEventListener("click", function()
        {
            if (currentPage < pageCount)
            {
                currentPage++;
                showPage(currentPage);
                updatePaginationIndicator();
            }
        });
    }

    paginationContainer.innerHTML =
	`<button id="prev-page" class="arrow-btn">◀</button>
	 <span id="page-indicator">${currentPage} / ${pageCount}</span>
	 <button id="next-page" class="arrow-btn">▶</button>`;

    setupArrowPagination();
    updatePaginationIndicator();

	function createPagination()
	{
		for (let i = 1; i <= pageCount; i++)
		{
			const btn = document.createElement("button");
			btn.textContent = i;
			btn.dataset.page = i;
			btn.addEventListener("click", function()
			{
				currentPage = Number(this.dataset.page);
				showPage(currentPage);

				if (lightbox.style.display === "flex")
				{
					lightbox.style.display = "none";
					lightboxImg.src = "";
				}
				if (videoModal.style.display === "flex")
				{
					videoModal.style.display = "none";
					videoIframe.src = "";
				}
			});
			paginationContainer.appendChild(btn);
		}
	}

	showPage(currentPage); */
});
