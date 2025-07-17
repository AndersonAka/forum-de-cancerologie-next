//Layout pour la page edition-2024

import Link from "next/link";
import Image from "next/image";

export default function Edition2024Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <section className="title-menu">
        <div className="title-intro">
          <p>FORUM DE CANCEROLOGIE DE ROCHE 2024</p>
        </div>
        <div className="theme-title">
          <div className="theme">
            <Image src="/img/2024/theme.png" alt="#" width={800} height={800} />
          </div>
          <div className="theme-des">
            <Image
              src="/img/2024/theme-des.png"
              alt="#"
              width={200}
              height={200}
            />
          </div>
        </div>

        <section className="banner">
          <Link href="https://player.snakker.io/s/rMAMmO5zVi">
            <Image
              src="/img/2024/SNAKKER/Breast cancer adjuvant snakk landscape-1.gif"
              alt="#"
              width={100}
              height={100}
            />
          </Link>
          <Link href="https://player.snakker.io/s/rMAMmO5zVi">
            <Image
              src="/img/2024/SNAKKER/Breast cancer metastatic snakk landscape-2.gif"
              alt="#"
              width={100}
              height={100}
            />
          </Link>
          <Link href="https://player.snakker.io/s/rMAMmO5zVi">
            <Image
              src="/img/2024/SNAKKER/Breast cancer trailer snack landscapeWide-3.gif"
              alt="#"
              width={100}
              height={100}
            />
          </Link>
        </section>
      </section>
      {children}
    </div>
  );
}
