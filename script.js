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
    function addProject(title, studentIds, names, poster, videoId, downloadId)
    {
        projects.push
        ({
            title: title,
            // 배열인지 아닌지만 판별하는 단순한 삼항연산입니다.
            // 여러명의 공동작업일 경우에는 ["aaa의 학번", "bbb의 학번"], ["aaa", "bbb"]의 형태로 호출하세요.
            studentIds: Array.isArray(studentIds) ? studentIds : [studentIds],
            names: Array.isArray(names) ? names : [names],
            poster: poster,
            videoId: videoId,
            downloadId: downloadId
        });
    }

    // 작품 하나하나마다 이렇게 해서 추가하면 좋습니다. HTML을 무한히 늘리지 마세요.
    // TODO: 입력받은 학번에 맞는 파일을 알아서 찾게 수정하고 싶음.
    addProject("IN THE DARK", "1988044", "황장민", "/images/1988044_poster.png", "", "1rriPjbuAw76GKpshN1c1-9ZUYB2nxIGU");
    addProject("고기산책로", "2036043", "이선귀", "/images/2036043_poster.png", "", "");
    addProject("냥이의 식탁", ["2088011", "2088041"], ["김지유", "정완희"], "/images/2088011_2088041_poster.png", "", "");
    addProject("a", ["2088002", "2088018", "2288020"], ["경정찬", "나정원", "윤동욱"], "", "", "");
    addProject("NIGHTFALL RUSH", "2088015", "김찬영", "/images/2088015_poster.png", "", "");
    addProject("Dungeon Crawl", "2088021", "박상범", "/images/2088021_poster.png", "", "");
    addProject("BPM: BEATS PER MINUTE", "2088026", "신중훈", "/images/2088026_poster.png", "", "");
    addProject("UNDEAD RUSH", "2088035", "장윤호", "/images/2088035_poster.png", "", "");
    addProject("비연", "2088037", "전민성", "/images/2088037_poster.png", "", "");
    addProject("A+", "2088044", "최문섭", "/images/2088044_poster.png", "", "");
    addProject("현대공군대결", "2188802", "최민섭", "/images/2188802_poster.png", "", "");
    addProject("혈무", ["2288049", "2288012"], ["박건우", "김승석"], "/images/2288049_2288012_poster.png", "", "");

    const grid = document.getElementById("grid");

    projects.forEach(function(proj)
    {
        let itemWrapper = document.createElement("div");
        itemWrapper.className = "item";

        // 3명 이상의 경우 폰트를 줄여서 화면 깨짐을 막습니다.
        let nameCount = proj.names.length;
        let fontSize = nameCount >= 3 ? "12px" : "14px";

        itemWrapper.innerHTML =
            `<div class="subtitle">
                <div style="font-weight: bold; font-size: 18px; text-align: center;">${proj.title}</div>
                <div style="font-size: ${fontSize};
                text-align: center;
                color: #555;
                white-space: nowrap;
                overflow: visible;
                text-overflow: unset;">
                    ${proj.studentIds.map((id, i) => `${id} ${proj.names[i]}`).join(" | ")}
                </div>
            </div>
            <img class="thumbnail" src="${proj.poster}" alt="포스터">
            <div class="buttons">
                <button class="video-btn" data-video-id="${proj.videoId}">동영상</button>
                <button class="download-btn" data-download-id="${proj.downloadId}">다운로드</button>
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
				alert("동영상이 없습니다.");
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

		if (fileId && !btn.hasAttribute("onclick"))
		{
			btn.addEventListener("click", function()
			{
				let url = "https://drive.google.com/uc?export=download&id=" + fileId;
				window.open(url, "_blank");
			});
		}
	});

	const items = Array.from(document.querySelectorAll(".item"));
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

	showPage(currentPage);
});