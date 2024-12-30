import Image from "next/image";
import about1 from "@/public/about1.jpg";
import about2 from "@/public/about2.jpg";
import Link from "next/link";
export const metadata = { title: "About" };

function page() {
  return (
    <div className="mt-5 max-w-[90%] lg:max-w-[1280px] min-h-screen mx-auto">
      <section>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="lg:w-[60%] mb-10 lg:mb-0 lg:mr-10">
            <h1 className="text-boshe-100 text-3xl lg:text-4xl  mb-6 lg:mb-10">
              歡迎來到 Boshe B&B
            </h1>
            <p className="leading-8 lg:leading-10 text-lg lg:text-xl text-warm-800 ">
              位於寧靜山谷中的這間波西米亞風格民宿，是您遠離都市喧囂的理想避風港。隱藏在青翠的樹林之中，這座民宿為追求身心平靜的旅客提供了一個完全融入自然的休憩之所。
              <br />
              <br />
              民宿內部裝潢融合了溫暖的泥土色調和鮮明的自然元素，讓人仿佛置身於藝術畫廊，每一個細節都散發出濃厚的手作氣息。
              <br />
              <br />
              從牆上的手工織物掛毯到房間裡的原木家具，您將感受到自然與藝術的完美結合。
              <br />
              <br />
              每間房間都以手工製作的裝飾品點綴，展現出獨特的個性，從柔和的棉麻布藝到精緻的陶器，都彰顯出波西米亞的自由與創意。
            </p>
          </div>
          <Image
            src={about1}
            width={330}
            height={400}
            alt="boshe"
            className="rounded-md md:w-auto w-[500px] lg:w-auto"
          />
        </div>
      </section>
      
      <section className="mt-20 border-t-boshe-200">
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <Image
            src={about2}
            width={430}
            height={300}
            alt="boshe"
            className="rounded-md mb-10 lg:mb-0"
          />
          <div className="lg:ml-10 text-center lg:text-left">
            <h1 className="text-boshe-100 text-3xl lg:text-4xl  mb-5">
              波西米亞風
            </h1>
            <p className="leading-8 lg:leading-10 text-md lg:text-xl text-warm-800 mb-6">
              這間隱身於山間的小木屋民宿，將波西米亞風格與自然完美融合，為旅人提供一個富有創意靈感的避世空間。
              <br />
              <br />
              遠離都市的繁忙，這裡是一片純粹的自然天堂，四周被壯麗的山景和清澈的溪流環繞，讓人一踏入便能感受到無比的自在與放鬆。
              <br />
              <br />
              民宿內部裝潢風格大膽而色彩豐富，每一個角落都充滿了色彩繽紛的地毯、原木家具和異國風情的裝飾，讓人感受到大自然的溫暖與波希米亞文化的自由精神。
            </p>
            <button className="border border-boshe-400 px-4 py-2 rounded-md  bg-boshe-300 text-zinc-100 hover:bg-boshe-200 duration-200">
              <Link href={"/room"}>立即查看你的第一間房間</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
