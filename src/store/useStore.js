import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import gallery1 from '../assets/images/gallery_1.png';
import gallery2 from '../assets/images/gallery_2.png';
import gallery3 from '../assets/images/gallery_3.png';

const useStore = create(
  persist(
    (set) => ({
      // Gallery State
      galleryFilter: 'all',
      setGalleryFilter: (filter) => set({ galleryFilter: filter }),
      selectedImage: null,
      setSelectedImage: (image) => set({ selectedImage: image }),
      
      galleryImages: [
        { id: 1, src: gallery1, title: '손끝 활동', desc: '의지와 창의성을 키우는 시간', category: 'activity' },
        { id: 2, src: gallery2, title: '숲 나들이', desc: '자연의 리듬을 배우는 시간', category: 'forest' },
        { id: 3, src: gallery3, title: '건강한 식사', desc: '몸과 마음을 채우는 시간', category: 'food' },
      ],
      galleryCategories: [
        { id: 'forest', name: '숲 활동' },
        { id: 'activity', name: '손끝 활동' },
        { id: 'food', name: '건강한 식사' }
      ],
      addGalleryImage: (newImage) => set((state) => ({ 
        galleryImages: [...state.galleryImages, { id: Date.now(), ...newImage }] 
      })),
      deleteGalleryImage: (id) => set((state) => ({ 
        galleryImages: state.galleryImages.filter(img => img.id !== id) 
      })),
      addGalleryCategory: (category) => set((state) => ({
        galleryCategories: [...state.galleryCategories, { id: Date.now().toString(), ...category }]
      })),
      deleteGalleryCategory: (id) => set((state) => ({
        galleryCategories: state.galleryCategories.filter(cat => cat.id !== id)
      })),

      // Inquiry State (Public)
      inquiries: [
        { id: 1, name: '김철수', phone: '010-1111-2222', content: '입소 대기 신청하고 싶습니다.', date: '2026-04-25', status: 'new' },
        { id: 2, name: '이영희', phone: '010-3333-4444', content: '교육 과정에 대해 궁금합니다.', date: '2026-04-26', status: 'read' },
      ],
      addInquiry: (newInquiry) => set((state) => ({ 
        inquiries: [
          { id: Date.now(), ...newInquiry, date: new Date().toISOString().split('T')[0], status: 'new' },
          ...state.inquiries 
        ] 
      })),
      toggleInquiryStatus: (id) => set((state) => ({
        inquiries: state.inquiries.map(iq => 
          iq.id === id ? { ...iq, status: iq.status === 'new' ? 'read' : 'new' } : iq
        )
      })),

      // Medication Requests (Parent -> Admin)
      medicationRequests: [],
      addMedicationRequest: (request) => set((state) => ({
        medicationRequests: [
          { id: Date.now(), ...request, date: new Date().toISOString().split('T')[0], status: 'pending' },
          ...state.medicationRequests
        ]
      })),
      updateMedicationStatus: (id, status) => set((state) => ({
        medicationRequests: state.medicationRequests.map(req => 
          req.id === id ? { ...req, status } : req
        )
      })),

      // Daily Reports (Teacher -> Parent)
      dailyReports: [
        { id: 1, classId: 'sunshine', title: '따뜻한 봄 햇살 아래 숲 나들이', content: '오늘은 아이들과 함께 뒷산으로 산책을 다녀왔습니다. 개나리가 핀 것을 보며 봄의 향기를 만끽했답니다.', date: '2026-04-27', author: '햇살반 선생님', comments: [] },
      ],
      addDailyReport: (report) => set((state) => ({
        dailyReports: [
          { id: Date.now(), ...report, date: new Date().toISOString().split('T')[0], comments: [] },
          ...state.dailyReports
        ]
      })),
      addComment: (reportId, comment) => set((state) => ({
        dailyReports: state.dailyReports.map(rep => 
          rep.id === reportId ? { ...rep, comments: [...rep.comments, { id: Date.now(), ...comment, date: new Date().toLocaleTimeString() }] } : rep
        )
      })),

      // Announcements
      announcements: [
        { id: 1, title: '5월 봄 소풍 안내', date: '2026-04-25', content: '5월 10일 즐거운 봄 소풍을 갑니다. 자세한 사항은 가정통신문을 참고해 주세요.' }
      ],
      addAnnouncement: (ann) => set((state) => ({
        announcements: [{ id: Date.now(), ...ann, date: new Date().toISOString().split('T')[0] }, ...state.announcements]
      })),

      // Content Management (CMS)
      content: {
        heroTitle: '자연에서 피어나는\n아이들의 꿈',
        heroSubtitle: '발도르프 숲교육으로 건강한 의지와 따뜻한 마음을 키웁니다.',
        address: '경기도 광주시 초월읍 산수로 58번길 100',
        phone: '010-XXXX-XXXX',
        email: 'joykinder@example.com',
        philosophy: [
          { icon: '🌿', title: '의지 발달', desc: '7세 이전의 아이들에게 가장 중요한 것은 건강한 의지(Will)의 형성입니다. 자연 속에서의 자유로운 활동을 통해 스스로 개척하는 힘을 기릅니다.' },
          { icon: '✨', title: '12감각의 조화', desc: '촉각, 생명감각, 운동감각, 균형감각 등 하위 감각을 고르게 발달시켜 세상을 향한 열린 마음을 가집니다.' },
          { icon: '🌬️', title: '숨쉬기 리듬', desc: '들숨과 날숨의 조화로운 리듬 속에서 아이들은 안정감을 느끼며 건강하게 성장합니다.' }
        ],
        rhythm: [
          { time: '09:00 - 10:00', title: '등원 및 자유 놀이 (들숨)', desc: '교실과 마당에서 자유롭게 놀며 하루를 준비합니다.' },
          { time: '10:00 - 10:30', title: '아침 모임 및 라이겐 (날숨)', desc: '다 함께 모여 노래를 부르고 율동(라이겐)을 하며 공동체 의식을 느낍니다.' },
          { time: '10:30 - 12:00', title: '숲 나들이 (날숨)', desc: '매일 숲으로 나가 자연 속에서 계절의 변화를 온몸으로 체험합니다.' },
          { time: '12:00 - 13:00', title: '점심 식사 (들숨)', desc: '유기농 식자재로 정성껏 만든 식사를 하며 감사하는 마음을 배웁니다.' },
          { time: '13:00 - 14:00', title: '낮잠 및 휴식 (들숨)', desc: '편안한 동화와 자장가를 들으며 에너지를 충전합니다.' },
          { time: '14:00 - 15:00', title: '오후 활동 및 귀가 (날숨)', desc: '수공예, 요리 등 요일별 활동을 마치고 가족의 품으로 돌아갑니다.' }
        ],
        waldorfArticle: {
          category: 'SPECIAL COLUMN',
          title: "실리콘밸리 부모들이 IT 기기 대신<br />'숲'을 선택한 이유",
          subtitle: '발도르프 숲교육의 5가지 반전',
          intro: [
            "첨단 기술의 정점에 서 있는 실리콘밸리의 부모들이 역설적이게도 자녀들을 컴퓨터 한 대 없는 '숲'으로 보내고 있습니다. 인공지능이 지식을 복제하는 시대, 부모들의 불안은 학업 성취를 넘어 <strong>'인간 본연의 가치'</strong>를 어떻게 지켜낼 것인가로 향합니다.",
            "루돌프 슈타이너의 <strong>인지학(Anthroposophy)</strong>에 뿌리를 둔 '발도르프 숲교육'은 단순한 야외 활동이 아닙니다. 그것은 기술 문명 속에서 파편화된 아이들의 영혼을 회복하고, 보이지 않는 내면의 힘을 길러주는 고도의 정신적 교육 실천입니다. 왜 지금, 다시 발도르프인지 그 깊은 통찰을 들여다봅니다."
          ],
          takeaways: [
            {
              num: 'Takeaway 01',
              title: "7세 전에는 글자를 가르치지 마세요: '의지'를 키우는 모방의 힘",
              desc: [
                "인지학적 관점에서 0~7세(제1기)는 아이가 세상을 향해 온몸을 열어두는 '하나의 거대한 감각기관'이 되는 시기입니다. 이 단계의 교육적 과제는 추상적 지식 습득이 아니라, 아이가 자신의 육체라는 물리적 틀 안에 건강하게 자리를 잡는 <strong>'육화(Incarnation)'</strong>를 돕는 것입니다.",
                "이 시기의 아이들은 '놀이'라는 이름의 성스러운 노작을 통해 <strong>'의지(Will)'</strong>를 발달시킵니다. 교사와 부모는 가르치는 자가 아니라, 아이가 기꺼이 따라 하고 싶은 <strong>'모방의 본보기'</strong>가 되어야 합니다. 아이가 어른의 건강한 생활 리듬과 수공예적 활동을 곁에서 지켜보며 모방하는 과정은, 장차 주체적인 삶을 개척해 나갈 강력한 의지의 토대가 됩니다."
              ],
              quote: "인지학적 관점에서 교육은 단순히 지식을 전달하는 과정이 아니라, 한 인간의 영혼이 신체라는 물리적 틀 안에 건강하게 육화할 수 있도록 돕는 예술적 행위입니다."
            },
            {
              num: 'Takeaway 02',
              title: "우리가 몰랐던 12가지 감각: 숲은 가장 완벽한 교실이다",
              desc: [
                "슈타이너는 인간의 감각을 12가지로 정의했습니다. 그중 유아기에 반드시 완성되어야 하는 <strong>하위 감각(촉각, 생명감각, 운동감각, 균형감각)</strong>은 숲이라는 비구조화된 환경에서 가장 이상적으로 발달합니다.",
                "매끄러운 플라스틱 장난감 대신 거친 나무껍질, 단단한 돌, 보드라운 흙을 만지며 아이들은 촉각적 민감도를 높입니다. 울퉁불퉁한 지면을 걷고 나무를 오르며 얻는 균형감각과 운동감각은 단순히 신체 발달에 머물지 않습니다. 발도르프 교육은 이 하위 감각의 안정이 향후 논리적 사고, 언어 능력, 사회적 공감 능력과 같은 <strong>'고등 감각'</strong>을 꽃피우기 위한 필수적인 전제 조건임을 강조합니다. 숲에서의 거친 놀이는 장차 고도의 지적 활동을 담아낼 그릇을 빚는 과정인 셈입니다."
              ]
            },
            {
              num: 'Takeaway 03',
              title: "삶의 리듬이 집중력을 만든다: '교육적 숨쉬기'의 미학",
              desc: [
                "발도르프 숲교육의 핵심은 자연의 순환을 교육에 녹여낸 <strong>'교육적 숨쉬기'</strong>에 있습니다. 아이들의 하루는 에너지를 밖으로 발산하는 <strong>'날숨(자유 놀이/산책)'</strong>과 내면으로 기운을 모으는 <strong>'들숨(집중/수렴)'</strong>이 정교하게 교차합니다.",
                "이러한 리듬은 일일, 주간, 연간 단위로 반복되며 아이들에게 깊은 심리적 안정감을 제공합니다. 예측 가능한 리듬 안에서 자라난 아이들은 외부 환경에 휘둘리지 않는 자존감을 형성하며, 자연의 거대한 순환 속에 자신을 통합시키는 지혜를 배웁니다."
              ]
            },
            {
              num: 'Takeaway 04',
              title: "교사는 지시자가 아니라 '묵묵히 작업하는 모델'이다",
              desc: [
                "발도르프 숲유치원의 교사는 무언가를 지시하거나 가르치지 않습니다. 대신 아이들 곁에서 묵묵히 바느질을 하거나 정원을 가꾸는 <strong>'모범적인 작업자'</strong>로 존재합니다. 아이들은 교사의 진지한 태도를 모방하며 삶에 대한 경건함을 배웁니다.",
                "또한, 물속에 색이 번지는 본질을 느끼게 하는 '습식 수채화' 활동과 절기를 온몸으로 체험하는 <strong>'라이겐(Reigen)'</strong>을 통해 예술적 감수성을 키웁니다. 이는 위험 감수와 탐구에 집중하는 일반적인 숲학교와 달리, 발도르프가 아동을 보호된 리듬 안에서 예술적·신화적 세계관과 연결하고자 함을 보여주는 결정적인 차이점입니다."
              ]
            },
            {
              num: 'Takeaway 05',
              title: "지적 학습의 '그릇'을 만드는 시간: '에포크'와 손끝의 마법",
              desc: [
                "실리콘밸리 부모들이 자녀에게 코딩 대신 뜨개질과 목공을 시키는 이유는 명확합니다. 손가락을 정교하게 사용하는 <strong>'손끝 감각(Manual Dexterity)'</strong>이 뇌의 신경망을 자극하고 추상적인 수학적 사고와 창의성의 근본이 되기 때문입니다.",
                "발도르프의 독특한 수업 방식인 <strong>'에포크(Epoch)'</strong>는 한 가지 주제를 수주 동안 깊이 있게 탐구하며 몰입의 힘을 기릅니다. 숲에서 자연물을 분류하고 숫자를 세던 경험은 에포크 수업을 통해 강력한 집중력과 지구력으로 승화됩니다. 이는 디지털 기기가 줄 수 없는 '딥 워크(Deep Work)' 능력이며, 인공지능 시대에 인간만이 가질 수 있는 독보적인 경쟁력이 됩니다."
              ]
            }
          ],
          conclusion: {
            title: "'머리, 가슴, 손'이 조화로운 아이로 키운다는 것",
            desc: [
              "발도르프 숲교육은 단순히 자연에서 노는 것을 넘어, 지적 편중에서 벗어나 <strong>'머리(사고), 가슴(감성), 손(의지)'</strong>이 조화롭게 발달한 전인적 인간을 지향합니다. 자연의 리듬 속에서 자신의 신체와 감각을 온전히 장악하며 자라난 아이들은, 어떤 거센 기술적 변화 앞에서도 흔들리지 않는 주체적인 자아를 갖게 될 것입니다."
            ],
            finalQuestion: "인공지능이 지식을 대신하는 시대, 우리 아이에게 끝까지 남겨주어야 할 인간다움은 무엇인가요?"
          }
        }
      },
      updateContent: (newContent) => set((state) => ({
        content: { ...state.content, ...newContent }
      })),

      // Shuttle & Meal Info
      shuttleInfo: {
        routes: [
          { id: 1, name: 'A코스 (단지내)', time: '08:30', stops: '아파트 정문 - 후문 - 관리소' },
          { id: 2, name: 'B코스 (역전방향)', time: '09:00', stops: '양평역 - 시장입구 - 보건소' },
        ],
      },
      mealMenu: {
        today: '유기농 현미밥, 들깨 미역국, 콩나물 무침, 한우 불고기, 유기농 사과',
        origin: '쌀/현미(국내산 유기농), 쇠고기(국내산 한우), 사과(국내산 유기농)',
      },

      // Students & Child Cards
      students: [
        { id: 'jihu', name: '김지후', classId: 'sunshine', parentId: 'parent1', allergies: '땅콩, 우유', notes: '최근 감기 기운이 있어 식사량이 줄었습니다.', photo: gallery1 },
        { id: 'seoyeon', name: '이서연', classId: 'sunshine', parentId: 'parent2', allergies: '없음', notes: '숲 활동을 아주 좋아합니다.', photo: gallery2 },
      ],
      updateStudent: (id, data) => set((state) => ({
        students: state.students.map(s => s.id === id ? { ...s, ...data } : s)
      })),
      addStudent: (newStudent) => set((state) => ({
        students: [...state.students, { id: `child_${Date.now()}`, ...newStudent }]
      })),

      // Child Card Notes (1:1 Communication)
      studentNotes: [
        { id: 1, studentId: 'jihu', authorId: 'teacher1', authorRole: 'teacher', content: '오늘 지후가 숲에서 처음으로 혼자 나무를 올랐습니다! 대견하네요.', date: '2026-04-28T10:00:00Z' },
        { id: 2, studentId: 'jihu', authorId: 'parent1', authorRole: 'parent', content: '감사합니다 선생님, 집에서도 칭찬 많이 해줘야겠어요.', date: '2026-04-28T10:30:00Z' },
      ],
      addStudentNote: (note) => set((state) => ({
        studentNotes: [...state.studentNotes, { id: Date.now(), date: new Date().toISOString(), ...note }]
      })),

      // SNS Community
      snsPosts: [
        { 
          id: 1, 
          authorId: 'teacher1', 
          authorName: '햇살반 선생님', 
          authorRole: 'teacher',
          content: '오늘 따뜻한 봄 햇살 아래 아이들과 텃밭에 물을 주었습니다. 작은 씨앗이 싹트는 모습을 보며 다들 신기해하네요. 🌱', 
          image: gallery3,
          date: '2026-04-28T11:00:00Z', 
          likes: 5,
          comments: [
            { id: 101, authorId: 'parent1', authorName: '지후 어머니', content: '사진만 봐도 마음이 따뜻해지네요. 고생 많으십니다!', date: '2026-04-28T11:15:00Z' }
          ] 
        }
      ],
      addSnsPost: (post) => set((state) => ({
        snsPosts: [{ id: Date.now(), date: new Date().toISOString(), likes: 0, comments: [], ...post }, ...state.snsPosts]
      })),
      deleteSnsPost: (postId) => set((state) => ({
        snsPosts: state.snsPosts.filter(post => post.id !== postId)
      })),
      updateSnsPost: (postId, updatedContent) => set((state) => ({
        snsPosts: state.snsPosts.map(post => 
          post.id === postId ? { ...post, content: updatedContent } : post
        )
      })),
      addSnsComment: (postId, comment) => set((state) => ({
        snsPosts: state.snsPosts.map(post => 
          post.id === postId 
            ? { ...post, comments: [...post.comments, { id: Date.now(), date: new Date().toISOString(), ...comment }] }
            : post
        )
      })),
      likeSnsPost: (postId) => set((state) => ({
        snsPosts: state.snsPosts.map(post =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      }))
    }),
    {
      name: 'joykinder-storage-v8', // v8로 캐시 초기화 (다중 자녀 및 사진 기능 추가)
    }
  )
);

export default useStore;
