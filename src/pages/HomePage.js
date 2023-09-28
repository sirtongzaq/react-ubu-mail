// HomePage.js
import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import Layout from "../Layout";

function HomePage({ user, onLogout }) {
  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <div className="bg-gray-50">
        <div className="flex justify-center items-center justify-items-center pl-72">
          <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 ">
            <div class="rounded overflow-hidden shadow-lg bg-white">
              <img
                class="w-full"
                src="https://images.unsplash.com/photo-1681356499703-2b6f3a4841cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Forest"
              />
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">
                  ม.อุบลฯ นำกลุ่มประเทศบิมสเทค เยือนความสำเร็จ
                  เศรษฐกิจสร้างสรรค์โมเดลฟื้นใจเมืองเขมราฐ
                </div>
                <p class="text-gray-700 text-base">
                  นับเป็นความภูมิใจของมหาวิทยาลัยอุบลราชธานี
                  ที่ได้ร่วมเป็นส่วนหนึ่งของการสนับสนุนบทบาทของประเทศไทยในฐานะประธานบิมสเทค
                  ในการต้อนรับตัวแทนกลุ่มประเทศบิมสเทค จาก 7 ประเทศได้แก่
                  บังคลาเทศ ภูฏาน เนปาล ศรีลังกา อินเดีย เมียนมา และไทย
                  ที่เข้าร่วมประชุมโครงการพัฒนาศักยภาพทรัพยากรมนุษย์เพื่อพัฒนาคุณภาพชีวิตผ่านเศรษฐกิจสร้างสรรค์และ
                  BCG Economy โอกาสนี้ ผู้ช่วยศาตราจารย์ดร.ปิยณัฐ สร้อยคำ
                  ผู้ช่วยอธิการบดีฝ่ายสื่อสารองค์กรและพันธกิจสัมพันธ์
                  พร้อมคณะผู้บริหาร และทีมนักวิจัย ให้การต้อนรับ คุณคิราน ศักยะ
                  ผู้อำนวยการกองความสัมพันธ์ระหว่างประชาชน สำนักเลขาธิการบิมสเทค
                  และ ดร.ลักษมณ สมานสินธุ์
                  รักษาราชการแทนผู้อำนวยการกองการต่างประเทศ
                  สำนักงานปลัดกระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัย และนวัตกรรม
                  (สป.อว.)
                  พร้อมนำชมความสำเร็จโครงการการจัดการทุนทางวัฒนธรรมเพื่อส่งเสริมเศรษฐกิจสร้างสรรค์
                  ณ อำเภอเขมราฐ จังหวัดอุบลราชธานี ซึ่งมี นายวชิระ วิเศษชาติ
                  นายกเทศมนตรีตำบลเขมราฐ
                  และชุมชนชาวเขมราฐให้การต้อนรับอย่างอบอุ่น ระหว่างวันที่ 9 – 10
                  กันยายน พ.ศ 2566 ที่ผ่านมา อ่านข่าวเพิ่มเติมได้ที่
                  https://www.ubu.ac.th/news.php?id=23261
                </p>
              </div>
              <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #33ปีมหาวิทยาลัยอุบลราชธานี
                </span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #มหาวิทยาลัยอุบลราชธานี
                </span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #อุบลราชธานี
                </span>
              </div>
            </div>
            <div class="rounded overflow-hidden shadow-lg bg-white">
              <img
                class="w-full"
                src="https://images.unsplash.com/photo-1681356499703-2b6f3a4841cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Forest"
              />
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">
                  ม.อุบลฯ รุกเดินหน้า TONKLA UBU พัฒนาหลักสูตรร่วมกับสถานศึกษา
                  CREDIT BANK
                </div>
                <p class="text-gray-700 text-base">
                  มหาวิทยาลัยอุบลราชธานี โดยงานรับเข้าการศึกษา กองบริการการศึกษา
                  จัดประชุมเชิงปฏิบัติการสร้างความเข้าใจ โครงการ TONKLA UBU
                  โรงเรียนในพื้นที่บริการ 4 จังหวัด ได้แก่ อุบลราชธานี ศรีสะเกษ
                  ยโสธร และอำนาจเจริญ โดยมีผู้ช่วยศาสตราจารย์ ดร.ณัฏฐ์ ดิษเจริญ
                  รองอธิการบดีฝ่ายวิชาการ เป็นประธาน พร้อมบรรยายในหัวข้อ
                  "มหาวิทยาลัยอุบลราชธานีกับการจัดการศึกษาตามแนวทางของ Credit
                  Bank" และ รองศาสตราจารย์ ดร.สุระ วุฒิพรหม ผู้อำนวยการ
                  โครงการห้องเรียนวิทยาศาสตร์ในโรงเรียน
                  ศูนย์มหาวิทยาลัยอุบลราชธานี บรรยายเรื่อง UBU SCIUS : โมเดล
                  การบริหารจัดการ และความสําเร็จ และเปิดเวทีเสวนา "TONKLA UBU
                  SHOW & SHARE" กิจกรรม workshop
                  การจัดการศึกษาและการพัฒนาหลักสูตรของโรงเรียนสู่การผลิตนักเรียนที่มีคุณภาพ
                  ซึ่งมีครู นักเรียนเข้าร่วมจำนวนกว่า คน ณ ห้องประชุม Ballroom
                  AB โรงแรมยูเพลส มหาวิทยาลัยอุบลราชธานี เมื่อวันที่ 14 กันยายน
                  2566 ที่ผ่านมา อ่านข่าวเพิ่มเติมได้ที่
                  https://www.ubu.ac.th/news.php?id=23260
                </p>
              </div>
              <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #33ปีมหาวิทยาลัยอุบลราชธานี
                </span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #มหาวิทยาลัยอุบลราชธานี
                </span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #อุบลราชธานี
                </span>
              </div>
            </div>
            <div class="rounded overflow-hidden shadow-lg bg-white">
              <img
                class="w-full"
                src="https://images.unsplash.com/photo-1681356499703-2b6f3a4841cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Forest"
              />
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">
                  ม.อุบลฯ จัดพิธีรับมอบเสื้อกาวน์ พร้อมก้าวสู่วิชาชีพสาธารณสุข
                </div>
                <p class="text-gray-700 text-base">
                  มหาวิทยาลัยอุบลราชธานี
                  โดยสโมสรนักศึกษาวิทยาลัยแพทยศาสตร์และการสาธารณสุข
                  จัดพิธีรับมอบเสื้อกาวน์วิชาชีพ นักศึกษา สาขาอนามัยสิ่งแวดล้อม
                  และสาขาสาธารณสุขศาสตร์ ชั้นปีที่ที่3 รุ่นที่ 16 จำนวน 141 คน
                  โดยมี นายแพทย์ประวิ อ่ำพันธ์
                  คณบดีวิทยาลัยแพทยศาสตร์และการสาธารณสุข เป็นประธาน
                  นำคณาจารย์มอบและสวมเสื้อกาวน์แก่นักศึกษา จำนวน 140 คน ณ
                  ห้องประชุม ชั้น 4 อาคารโภชนาการ
                  วิทยาลัยแพทยศาสตร์และการสาธารณสุข เมื่อวันที่ 13 กันยายน 2566
                  ที่ผ่านมา อ่านข่าวเพิ่มเติมได้ที่
                  https://www.ubu.ac.th/news.php?id=23259
                </p>
              </div>
              <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #33ปีมหาวิทยาลัยอุบลราชธานี
                </span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #มหาวิทยาลัยอุบลราชธานี
                </span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #อุบลราชธานี
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
