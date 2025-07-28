"use strict";

document.addEventListener("DOMContentLoaded", () =>
{
	// DOM 요소
	const grid = document.getElementById("grid");
	const lightbox = document.getElementById("lightbox");
	const lightboxImg = document.getElementById("lightbox-img");
	const videoModal = document.getElementById("video-modal");
	const videoIframe = document.getElementById("video-iframe");

	// 프로젝트 데이터
	const projects = [];
	const addProject = (title, ids, names, poster, videoId, downloadId, git) =>
		projects.push({
			title,
			studentIds : Array.isArray(ids)   ? ids   : [ids],
			names      : Array.isArray(names) ? names : [names],
			poster     : poster || "/images/no_image_ChatGPT.png",
			videoId,
			downloadId,
			githubLink : git || ""
		});

  addProject("리듬파이터", "1988014", "김현우", "", "1swp87zbhiKIm9JPdBuPoW3Iqs5qhcyDy", "14MdtCZa2Nd9tTgaL9w8Ft3LV55tKysEx", "");
  addProject("Twins", "1988019", "박준학", "", "1blsRBpowWcVMjfEYzM17zWYa1vPSl1N9", "1PcuyEHaeBFbP3l0ZKDQ6JD_-Nz1en5ES", "");
  addProject("IN THE DARK", "1988044", "황장민", "/images/1988044_poster.png", "11ZQUFM9OVuHzrNHjJuxHoh887S5f3BOr", "1rriPjbuAw76GKpshN1c1-9ZUYB2nxIGU", "");
  addProject("고기산책로", "2036043", "이선귀", "/images/2036043_poster.png", "1SkvpUW8DWGda9a9NDVbM-WY-B54apZYO", "1yaI90e9Exe2U4Y_AKgWMEhL3ZmR8zhzQ", "https://github.com/sungwidard7/Project_MeatPath.git");
  addProject("Dragon Slayer", ["2088002", "2088018", "2288020"], ["경정찬", "나정원", "윤동욱"], "/images/2088002_2088018_2288020_poster.png", "1bV4_z3aOStQ5l7VFQKMN-zgikvWmN814", "1JxRCfvMWImg6BepkfCMHEq0MZ2P3wAWY", "");
  addProject("AirStrike", "2088005", "권현민", "/images/2088005_poster.png", "1gYbS2bnQtzbmkmBfdDAEJozZ4rw29cR1", "1nWZbS76faY57b3033qtzTj8XEhOTlq0u", "");
  addProject("냥이의 식탁", ["2088011", "2088041"], ["김지유", "정완희"], "/images/2088011_2088041_poster.png", "1x27UkB-AGs6xJZZzWPNJbBRN8OB_H0XF", "1NzCPSAvqkol2fngJhrltF1b8nSrlyiJJ", "https://dhksgml.github.io/NyangsTable/");
  addProject("전탄발사", "2088013", "김진욱", "/images/2088013_poster.png", "1OfqibmH3xb_onV2tX82yylssf2lya-Ge", "1RflnXjKlurPO_zv8JNouNYAROBiiGftz", "");
  addProject("NIGHTFALL RUSH", "2088015", "김찬영", "/images/2088015_poster.png", "1GWb5yj9fZdFCRKwY1C8E2UDrNT8-y0S6", "1YV38NW1xTiisYbLh1k7JwoAxhd9MeUpa", "https://github.com/rlacksdud01/NightFall_Rush");
  addProject("Farm Farm Island", "2088019", "남혁진", "/images/2088019_poster.png", "1SBWK8CRkLA9w9lUMgeLYlozJ-Xje3pl3", "1_VVimr9xz7h7MIsuOP_or9sgCdEpsLSV", "https://github.com/HykJn/Project_FFI");
  addProject("Dungeon Crawl", "2088021", "박상범", "/images/2088021_poster.png", "1M36sBrPeBFsvfu1Cwgr6pJhq8xMN9SUP", "17Ojsn0A6KPX7-MqRxMO3_2QjLqSzkDFm", "https://github.com/WeakSpoter/School-Project.git");
  addProject("BPM: BEATS PER MINUTE", "2088026", "신중훈", "/images/2088026_poster.png", "1XDD0A_VGmlwS64ekQtrkDWI4IFH_2xad", "1x_EI1FU40hfOeVjZ13UytTdrvzZHxuo3", "https://github.com/ShinJooongHooon/BPM");
  addProject("BIG HEAD", "2088030", "윤준서", "/images/2088030_poster.png", "1ObcsYBsceudnWAl6R2cbRyj9-n6oNC-1", "1jfM60Vo-q2YzXDBYbefOkqMitHdfd-th", "");
  addProject("UNDEAD RUSH", "2088035", "장윤호", "/images/2088035_poster.png", "1x3psjjg__b4pjjl5euZ5JUnmaClZ4U-K", "1q45P_3P7yOh5aEQRhDRb_sUzglr8hAn4", "");
  addProject("비연 (PC)", "2088037", "전민성", "/images/2088037_poster.png", "1_d8Ocg1yE7t6yivrn19l65NCdVyeuqi6", "1ZPiPIUztD4HLNh34drlt3jjUnwq3awOd", "https://github.com/JMS2001K/Flying-Swallow/tree/main");
  addProject("A+", "2088044", "최문섭", "/images/2088044_poster.png", "1mWCyKG5psDCVuEiqrggu6An8O0YzlMrT", "1467uaxd7F2bA-mko-KSDPXpItabRcg7_", "");
  addProject("Tele Connect", "2088046", "황인수", "/images/2088046_poster.png", "125yFxSlJ4YKgvzolOVADzEn-Sh7vc-CV", "", "https://github.com/psychicmage/Project-VA-.git");
  addProject("PROJECT-T", "2188045", "노영준", "/images/2188045_poster.jpg", "1iScayp_5OfhAaM-CLWyyPDZO59zFhVSb", "");
  addProject("현대공군대결", "2188802", "최민섭", "/images/2188802_poster.png", "1BnMe8oqRYMM0sIPhoJD-D06F9l6K1990", "19DeC7e6FoIvQNIaG0YVDL3iObX1l6qm_", "https://github.com/f1709/-/blob/main/README.md");
  addProject("Escape from Wizard: Sun & Moon", ["2288014", "2288014"], ["김다희", "남경서"], "/images/2288014_2288014_poster.png", "1lnLCmHVJbPfftTbHTMmD1VA57B-4F9qO", "1MYGC_udgfLUIDPLhcltzay38QiEL_WjM", "");
  addProject("2Dragon -혈무-", ["2288049", "2288012"], ["박건우", "김승석"], "/images/2288049_2288012_poster.png", "1mNoHw4T-92HCpAgpDNzRAsSqUNXwKGpV", "1YkkdzfsyQvBQfBgHC-WE0xXlGkcvjeyS", "https://github.com/Nyam03/2Dragon_Capstone");

	// 요소 폭에 맞춰 폰트 크기 조정
	function shrinkToFit(el, maxRem = 1.2, minRem = 0.55)
	{
		const parentWidth = el.parentElement.clientWidth;
		let low  = minRem;
		let high = maxRem;

		while (high - low > 0.02)
		{
			const mid = (low + high) / 2;
			el.style.fontSize = `${mid}rem`;
			(el.scrollWidth <= parentWidth) ? low = mid : high = mid;
		}
		el.style.fontSize = `${low.toFixed(2)}rem`;
	}

	function autoFit(tile)
	{
		shrinkToFit(tile.querySelector(".project-title"),   1.2, 0.55);
		shrinkToFit(tile.querySelector(".project-members"), 1.0, 0.45);
	}

	// 그리드 채우기
  document.fonts.ready.then(() => {
    projects.forEach(proj => {
      const item = document.createElement("div");
      item.className = "flex flex-col items-center p-4";

      item.innerHTML = `
        <div class="mb-2 text-center h-16 overflow-hidden w-full flex flex-col justify-center">
          <div class="project-title font-extrabold text-xl whitespace-nowrap overflow-hidden w-full">
            ${proj.title}
          </div>
          <!-- wrapper로 세로 고정 -->
          <div class="h-[22px] overflow-hidden flex items-center justify-center">
            <div class="project-members flex gap-x-2 text-gray-600 whitespace-nowrap text-[0.76rem]">
              ${proj.studentIds
                .map((id, i) => `${id}&nbsp;${proj.names[i]}`)
                .join('<span class="px-1">&nbsp;|&nbsp;</span>')}
            </div>
          </div>
        </div>

        <img class="thumbnail" src="${proj.poster}" alt="포스터">

        <div class="buttons">
          <button class="video-btn" data-video-id="${proj.videoId}">동영상</button>
          <button class="download-btn" data-download-id="${proj.downloadId}">다운로드</button>
          ${proj.githubLink ? `<button class="github-btn" data-github-link="${proj.githubLink}">Github</button>` : ""}
        </div>
      `;

      grid.appendChild(item);
      autoFit(item);
      new ResizeObserver(entries => entries.forEach(e => autoFit(e.target))).observe(item);
    });
  });

	// 모달 닫기 함수
	const closeLightbox = () =>
	{
		lightbox.style.display = "none";
		lightboxImg.src = "";
	};
	const closeVideo = () =>
	{
		videoModal.style.display = "none";
		videoIframe.src = "";
	};

	// 클릭 핸들러
	const clickHandlers =
	[
		[".thumbnail", el => {
			lightboxImg.src = el.src;
			lightbox.style.display = "flex";
		}],
		["#lightbox-close", () => closeLightbox()],
		[".video-btn", el => {
			const id = el.dataset.videoId;
			if (!id)
        return alert("동영상이 제출되지 않았습니다.");
			videoIframe.src = `https://drive.google.com/file/d/${id}/preview`;
			videoModal.style.display = "flex";
		}],
		["#video-close", () => closeVideo()],
		[".download-btn", el => {
			const id = el.dataset.downloadId;
			if (!id)
        return alert("파일이 제출되지 않았습니다.");
			window.open(`https://drive.google.com/uc?export=download&id=${id}`, "_blank");
		}],
		[".github-btn", el => {
			const link = el.dataset.githubLink;

			if (link)
        window.open(link, "_blank");
		}]
	];

	document.addEventListener("click", e =>
	{
		for (const [selector, handler] of clickHandlers)
		{
			const el = e.target.closest(selector);

			if (el)
			{
				handler(el);
				break;
			}
		}
	});
});
