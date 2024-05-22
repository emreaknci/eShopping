import React from 'react'
import { Typography } from '@mui/material';

const DeliveryInformations = () => {
    const orderAndReturnDetails = [
        {
            title: "Teslimat Bilgileri", details: [
                "Standart teslimat ile hafta içi saat 14:00'a kadar verilen siparişler aynı gün, hafta içi 14:00'dan sonra , hafta sonu ve resmi tatillerde verilen siparişler bir sonraki iş günü kargoya verilir.",
                "1.500 TL ve üzeri siparişlerinizde kargo ücretsizdir, 1.500 TL altı işlemlerde ise 39,90 TL olmaktadır."
            ]
        },
        {
            title: "Ürün İadesi", details: [
                "Yaptığınız alışverişten herhangi bir nedenle memnun kalmadığınız ürünlerinizi (satılabilirliğin kaybetmiş ürünler hariç) kullanılmamış olmak koşuluyla, tüm aksesuarları orijinal ambalajı ve faturası ile birlikte eksiksiz bir şekilde siparişinizi teslim aldığınız andan itibaren 14 gün içerisinde cezai şart ödemeksizin iade edebilirsiniz. Ürününüzü isterseniz anlaşmalı kargo firmaları ile depomuza ücretsiz gönderebilir ya da mağazalarımıza iade edebilirsiniz. İade talebiniz onaylandıktan sonra paranız ödeme yönteminize göre iade edilir.",
                "Mesafeli Sözleşmeler yönetmeliğinde yer alan Cayma Hakkının İstisnaları maddesi uyarınca tüketici aşağıdaki ürünlerde cayma hakkını kullanamaz: a) Satılabilirliğini kaybetmiş ürünler (vakumlu/jelatinli ambalajı açık/yırtık ürünler, sim kart takılmış cep telefonu ve cep bilgisayarları b) kurulumu yapılmış LCD TV, PC, Notebook vb cihazlar c) kartuşu açılmış yazıcı, faks makinesi, ambalajı açılmış tek kullanımlık ürünler, kulaklık, yazılımlar vb, d) satışı Operatör Temlikli/Sözleşmeli yapılan ürünler e) ambalajı açılmış kişisel bakım ve hijyen ürünleri e) tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan ürünler f) çabuk bozulabilen veya son kullanma tarihi geçebilecek ürünler g) tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olan ürünlerden; iadesi sağlık ve hijyen açısından uygun olmayan ürünler h) tesliminden sonra başka ürünlerle karışan ve doğası gereği ayrıştırılması mümkün olmayan ürünler ı) malın tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olması halinde maddi ortamda sunulan kitap, dijital içerik ve bilgisayar sarf malzemeleri k) ambalajı açılmış yazılım ve/veya oyun CD'si l) tek kullanımlık ürünler, kopyalanabilir yazılım ve programlar, DVD, VDC, CD ve kasetler, kişisel bakım ürünleri (traş makinesi, traş köpüğü, epilatör, diş bakım ürünleri,baskül vs.) ile sarf malzemeleri (toner, kartuş...vs) ancak ambalajı açılmamış ve kullanılmamış olmaları halinde iade alınabilmektedir.",
                "İade başvurusu için ‘Siparişlerim’ bölümüne gidip ilgili siparişinizde iade başvurusunu yapabilirsiniz. İşlem sonrasında size özel oluşturulan iade kargo kodunu kullanarak ürünleri ücretsiz olarak gönderebilirsiniz. Horoz Lojistik iade alımları için 0850 222 55 99 numaralı Teknosa müşteri hizmetlerimizden yardım alabilirsiniz."
            ]
        },
        {
            title: "Ürün Değişimi", details: [
                "Değişim işlemlerinizin başlayabilmesi için ürününüzün yetkili servis tarafından incelenmesi gerekmektedir. yetkili servis incelemesi sonucunda 'Değişime Uygundur' ibaresi bulunan raporlar için değişim işlemi yapılır.",
                "Değişim işlemleriniz de size en yakın mağazamızı ziyaret edebilirsiniz. Satın alınan ürünün stoklarda olması halinde birebir değişim yapılmaktadır. Talep edilen ürünün stokta olmaması haline tutar iadesi yapılmaktadır."
            ]
        }
    ]
    return (
        <>
            {orderAndReturnDetails.map((detail, outerIndex) => (
                <div key={detail.title}>
                    <Typography variant="h6" fontWeight={"bold"} mb={1} color="primary">
                        {detail.title}
                    </Typography>
                    {detail.details.map((item, innerIndex) => (
                        <div key={`${outerIndex}-${innerIndex}`}>
                            <Typography variant="body1">{item}</Typography>
                            <br />
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}

export default DeliveryInformations