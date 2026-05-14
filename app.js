const titles = {
  dashboard: "운영 대시보드",
  courses: "강좌 관리",
  learners: "학습자 관리",
  reports: "성과 리포트",
};

const queueItems = [
  ["신규 강좌 개설 승인", "공공데이터 활용 입문 외 4건", "심사"],
  ["학습 부진 알림 발송", "진도율 30% 미만 128명", "주의"],
  ["시험 문항 검수", "개인정보보호 기본 과정", "검수"],
  ["기관 관리자 초대", "서울·부산 권역 7개 기관", "계정"],
];

const courses = [
  ["개인정보보호 기본", "공공기관 담당자를 위한 필수 보안 교육", "운영중", "82%"],
  ["디지털 행정 실무", "전자문서, 민원 처리, 협업 도구 활용", "심사중", "64%"],
  ["재난 안전 대응", "상황 전파부터 현장 보고까지 실습 중심", "운영중", "91%"],
  ["공공데이터 활용 입문", "데이터 수집, 정제, 시각화 기초 과정", "초안", "38%"],
  ["청렴 윤리 교육", "사례 기반 퀴즈와 서약 관리 포함", "운영중", "76%"],
  ["AI 행정 서비스 이해", "생성형 AI 활용 기준과 업무 적용", "준비중", "52%"],
];

const learners = [
  ["서울 권역", "5,240", "78%", "42명", "김민서"],
  ["부산 권역", "3,180", "71%", "36명", "박준호"],
  ["대전 권역", "2,460", "83%", "18명", "이서연"],
  ["광주 권역", "1,930", "69%", "29명", "최도윤"],
  ["강원 권역", "1,420", "74%", "21명", "정하린"],
];

const completionByMonth = [54, 61, 68, 72, 77, 84];

const queueList = document.querySelector("#queueList");
const courseGrid = document.querySelector("#courseGrid");
const learnerRows = document.querySelector("#learnerRows");
const barChart = document.querySelector("#barChart");
const viewTitle = document.querySelector("#view-title");
const searchInput = document.querySelector("#searchInput");
const monthRange = document.querySelector("#monthRange");
const monthLabel = document.querySelector("#monthLabel");

function renderQueue(items = queueItems) {
  queueList.innerHTML = items
    .map(
      ([title, detail, badge]) => `
        <article class="queue-item">
          <div>
            <strong>${title}</strong>
            <span>${detail}</span>
          </div>
          <span class="badge">${badge}</span>
        </article>
      `,
    )
    .join("");
}

function renderCourses(items = courses) {
  courseGrid.innerHTML = items
    .map(
      ([title, detail, status, progress]) => `
        <article class="course-card">
          <h3>${title}</h3>
          <p>${detail}</p>
          <div class="progress-track"><span style="width: ${progress}"></span></div>
          <div class="course-meta">
            <span>${status}</span>
            <span>${progress}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderLearners(items = learners) {
  learnerRows.innerHTML = items
    .map(
      ([agency, count, complete, risk, owner]) => `
        <tr>
          <td>${agency}</td>
          <td>${count}</td>
          <td>${complete}</td>
          <td>${risk}</td>
          <td>${owner}</td>
        </tr>
      `,
    )
    .join("");
}

function renderBars(offset = 0) {
  barChart.innerHTML = completionByMonth
    .map((value, index) => {
      const adjusted = Math.min(96, value + offset + index);
      return `<div class="bar" style="height: ${adjusted}%"><span>${adjusted}%</span></div>`;
    })
    .join("");
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.view;
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`#${target}`).classList.add("active");
    viewTitle.textContent = titles[target];
  });
});

document.querySelector("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("compact");
});

searchInput.addEventListener("input", (event) => {
  const keyword = event.target.value.trim().toLowerCase();
  const filteredCourses = courses.filter((course) => course.join(" ").toLowerCase().includes(keyword));
  const filteredLearners = learners.filter((row) => row.join(" ").toLowerCase().includes(keyword));
  renderCourses(keyword ? filteredCourses : courses);
  renderLearners(keyword ? filteredLearners : learners);
});

monthRange.addEventListener("input", (event) => {
  const month = Number(event.target.value);
  monthLabel.textContent = `${month}월`;
  renderBars(month - 5);
});

renderQueue();
renderCourses();
renderLearners();
renderBars();
