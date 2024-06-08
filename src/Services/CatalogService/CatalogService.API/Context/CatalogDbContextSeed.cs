﻿using CatalogService.API.Models;
using Npgsql;
using Polly;
using Polly.Retry;

namespace CatalogService.API.Context
{
    public class SeedData
    {
        public static IEnumerable<Brand> Brands => new List<Brand>
        {
            new () {Id=1, Name = "APPLE" },
            new () {Id=2, Name = "SAMSUNG" },
            new () {Id=3, Name = "HUAWEI" },
            new () {Id=4, Name = "XIAOMİ" },
            new () {Id=5, Name = "OPPO" },
            new () {Id=6, Name = "VESTEL" },
            new () {Id=7, Name = "ASUS" },
            new () {Id=8, Name = "LENOVO" },
            new () {Id=9, Name = "HP" },
            new () {Id=10, Name = "MONSTER" },
            new () {Id=11, Name = "LOGITECH" },
            new () {Id=12, Name = "JBL" },
            new () {Id=13, Name = "SENNHEISER" },
            new () {Id=14, Name = "SEAGATE" },
            new () {Id=15, Name = "WD" },
            new () {Id=16, Name = "KINGSTON" },
            new () {Id=17, Name = "CRUCIAL" },
            new () {Id=18, Name = "ACER" },
            new () {Id=19, Name = "MSI" },
            new () {Id=20, Name = "CASPER" },
            new () {Id=21, Name = "TCL" },
            new () {Id=22, Name = "PHILIPS" },
            new () {Id=23, Name = "LG" },
            new () {Id=24, Name = "Sony SONY" },
            new () {Id=25, Name = "CANON" },
            new () {Id=26, Name = "AMD" },
            new () {Id=27, Name = "INTEL" },
            new () {Id=28, Name = "NVIDIA" },
            new () {Id=29, Name = "GIGABYTE" },
            new () {Id=30, Name = "CORSAIR" },
            new () {Id=31, Name = "GSKILL" },
            new () {Id=32, Name = "RAMPAGE" },
            new () {Id=33, Name = "STEELSERIES" },
            new () {Id=34, Name = "RAZER" },
            new () {Id=35, Name = "DELL" },
            new () {Id=36, Name = "THERMALTAKE" },
            new () {Id=37, Name = "COOLER MASTER" },
            new () {Id=38, Name = "DEEPCOOL" },
            new () {Id=39, Name = "JWIN" },
            new () {Id=40, Name = "ANKER" },
            new () {Id=41, Name = "ARZUM" },
            new () {Id=42, Name = "BOSCH" },
            new () {Id=44, Name = "ARCELIK" },
            new () {Id=45, Name = "BEKO" },
            new () {Id=46, Name = "FAKIR" },
            new () {Id=47, Name = "BRAUN" },
            new () {Id=48, Name = "ADDISON" },
            new () {Id=49, Name = "CELLURLARLINE" },
            new () {Id=50, Name = "NIKON" },
        };

        public static IEnumerable<Category> Categories => new List<Category>
        {
            new () {Id=1, Name = "Telefon" },
            new () {Id=2, Name = "Bilgisayar" },
            new () {Id=3, Name = "Tv, Görüntü ve Ses" },
            new () {Id=4, Name = "Bilgisayar Parçaları" },
            new () {Id=5, Name = "Aksesuar" },

            new () {Id=6, Name = "Notebook",ParentCategoryId=2 },
            new () {Id=7, Name = "Masaüstü Bilgisayar",ParentCategoryId=2 },
            new () {Id=8, Name = "Tabletler",ParentCategoryId=2 },
            new () {Id=9, Name = "Monitörler",ParentCategoryId=2 },

            new () {Id=10, Name = "Televizyonlar",ParentCategoryId=3 },
            new () {Id=11, Name = "Projeksiyonlar",ParentCategoryId=3 },
            new () {Id=12, Name = "Kulaklık",ParentCategoryId=3 },

            new () {Id=13, Name = "Anakart",ParentCategoryId=4 },
            new () {Id=14, Name = "Ekran Kartları",ParentCategoryId=4 },
            new () {Id=15, Name = "Güç Kaynakları",ParentCategoryId=4 },
            new () {Id=16, Name = "İşlemciler",ParentCategoryId=4 },
            new () {Id=17, Name = "Ram",ParentCategoryId=4 },
            new () {Id=18, Name = "SSD",ParentCategoryId=4 },

            new () {Id=19, Name = "Powerbank",ParentCategoryId=5 },
            new () {Id=20, Name = "Laptop Çantaları",ParentCategoryId=5 },
        };

        public static IEnumerable<Feature> Features = new List<Feature>()
        {
            new () {Id=1, Name = "Dahili Hafıza (Mobil)" },
            new () {Id=2, Name = "Ekran Boyutu Aralığı" },
            new () {Id=3, Name = "RAM Boyutu (Mobil)" },
            new () {Id=4, Name = "Kamera Çözünürlüğü" },
            new () {Id=5, Name = "Ekran Yenileme Hızı" },
            new () {Id=6, Name = "Batarya" },
            new () {Id=7, Name = "İşletim Sistemi (Mobil)" },
            new () {Id=8, Name = "İşlemci" },
            new () {Id=9, Name = "Ekran Kartı" },
            new () {Id=10, Name = "Dahili Hafıza (Bilgisayar)" },
            new () {Id=11, Name = "RAM Boyutu (Bilgisayar)" },
            new () {Id=12, Name = "İşletim Sistemi (Bilgisayar)" },
            new () {Id=13, Name = "Ekran Boyutu (Bilgisayar)" },
            new () {Id=14, Name = "Aydınlatmalı Klavye" },
            new () {Id=15, Name = "Çözünürlük (Piksel)" },
            new () {Id=16, Name = "Ekran Boyutu (TV)" },
            new () {Id=17, Name = "Ekran Tipi" },
            new () {Id=18, Name = "Çözünürlük (TV)" },
            new () {Id=19, Name = "RAM Tipi" },
            new () {Id=20, Name = "RAM Slot Sayısı" },
            new () {Id=21, Name = "Bluetooth Desteği" },
            new () {Id=22, Name = "Güç Değeri" },
            new () {Id=23, Name = "Kapasite (SSD)" },
            new () {Id=24, Name = "Okuma Hızı" },
            new () {Id=25, Name = "Yazma Hızı" },
            new () {Id=26, Name = "Ram Kapasitesi" },
            new () {Id=28, Name = "Ram Hızı" },
            new () {Id=31, Name = "İşlemci Hızı" },
            new () {Id=32, Name = "İşlemci Çekirdek Sayısı" },
            new () {Id=33, Name = "Kablosuz Şarj" },
            new () {Id=34, Name = "Renk" },
            new () {Id=35, Name = "Kapasite (Powerbank)" },
            new () {Id=36, Name = "Laptop Boyut Aralığı" },
        };

        public static IEnumerable<CategoryFeature> CategoryFeatures = new List<CategoryFeature>()
        {
            new (){Id=1,CategoryId=1,FeatureId=1},
            new (){Id=2,CategoryId=1,FeatureId=2},
            new (){Id=3,CategoryId=1,FeatureId=3},
            new (){Id=4,CategoryId=1,FeatureId=4},
            new (){Id=5,CategoryId=1,FeatureId=5},
            new (){Id=6,CategoryId=1,FeatureId=6},
            new (){Id=7,CategoryId=1,FeatureId=7},
            new (){Id=8,CategoryId=2,FeatureId=8},
            new (){Id=9,CategoryId=2,FeatureId=9},
            new (){Id=10,CategoryId=2,FeatureId=10},
            new (){Id=11,CategoryId=2,FeatureId=11},
            new (){Id=12,CategoryId=2,FeatureId=12},
            new (){Id=13,CategoryId=6,FeatureId=13},
            new (){Id=14,CategoryId=6,FeatureId=14},
            new (){Id=15,CategoryId=6,FeatureId=15},
            new (){Id=16,CategoryId=9,FeatureId=15},
            new (){Id=17,CategoryId=9,FeatureId=5},
            new (){Id=18,CategoryId=10,FeatureId=16},
            new (){Id=19,CategoryId=10,FeatureId=17},
            new (){Id=20,CategoryId=10,FeatureId=18},
            new (){Id=21,CategoryId=13,FeatureId=19},
            new (){Id=22,CategoryId=13,FeatureId=20},
            new (){Id=23,CategoryId=13,FeatureId=21},
            new (){Id=24,CategoryId=15,FeatureId=22},
            new (){Id=25,CategoryId=16,FeatureId=31},
            new (){Id=26,CategoryId=16,FeatureId=32},
            new (){Id=27,CategoryId=17,FeatureId=19},
            new (){Id=28,CategoryId=17,FeatureId=26},
            new (){Id=29,CategoryId=17,FeatureId=28},
            new (){Id=30,CategoryId=18,FeatureId=23},
            new (){Id=31,CategoryId=19,FeatureId=35},
            new (){Id=32,CategoryId=20,FeatureId=36},
        };

        public static IEnumerable<FeatureValue> FeatureValues = new List<FeatureValue>()
        {
            new () {Id=1,FeatureId=1,Value="16 GB"},
            new () {Id=2,FeatureId=1,Value="32 GB"},
            new () {Id=3,FeatureId=1,Value="64 GB"},
            new () {Id=4,FeatureId=1,Value="128 GB"},
            new () {Id=5,FeatureId=1,Value="256 GB"},
            new () {Id=6,FeatureId=1,Value="512 GB"},
            new () {Id=7,FeatureId=1,Value="1 TB"},

            new () {Id=8,FeatureId=2,Value="5.1 Inch - 6.00 Inch"},
            new () {Id=9,FeatureId=2,Value="6.1 Inch - 6.5 Inch"},
            new () {Id=10,FeatureId=2,Value="6.5+ Inch"},

            new () {Id=11,FeatureId=3,Value="2 GB"},
            new () {Id=12,FeatureId=3,Value="3 GB"},
            new () {Id=13,FeatureId=3,Value="4 GB"},
            new () {Id=14,FeatureId=3,Value="6 GB"},
            new () {Id=15,FeatureId=3,Value="8 GB"},
            new () {Id=16,FeatureId=3,Value="12 GB"},
            new () {Id=17,FeatureId=3,Value="16 GB"},

            new () {Id=18,FeatureId=4,Value="12 MP"},
            new () {Id=19,FeatureId=4,Value="16 MP"},
            new () {Id=20,FeatureId=4,Value="20 MP"},
            new () {Id=21,FeatureId=4,Value="24 MP"},
            new () {Id=22,FeatureId=4,Value="32 MP"},
            new () {Id=23,FeatureId=4,Value="48+ MP"},

            new () {Id=24,FeatureId=5,Value="60 Hz"},
            new () {Id=25,FeatureId=5,Value="90 Hz"},
            new () {Id=26,FeatureId=5,Value="120 Hz"},

            new () {Id=27,FeatureId=6,Value="3000 mAh"},
            new () {Id=28,FeatureId=6,Value="4000 mAh"},
            new () {Id=29,FeatureId=6,Value="5000 mAh"},
            new () {Id=30,FeatureId=6,Value="6000 mAh"},
            new () {Id=31,FeatureId=6,Value="7000 mAh"},

            new () {Id=32,FeatureId=7,Value="Android"},  
            new () {Id=33,FeatureId=7,Value="IOS"},

            new () {Id=34,FeatureId=8,Value="AMD Ryzen 3"},
            new () {Id=35,FeatureId=8,Value="AMD Ryzen 5"},
            new () {Id=36,FeatureId=8,Value="AMD Ryzen 7"},
            new () {Id=37,FeatureId=8,Value="AMD Ryzen 9"},
            new () {Id=38,FeatureId=8,Value="Intel Core i3"},
            new () {Id=39,FeatureId=8,Value="Intel Core i5"},
            new () {Id=40,FeatureId=8,Value="Intel Core i7"},
            new () {Id=41,FeatureId=8,Value="Intel Core i9"},
            new () {Id=42,FeatureId=8,Value="Intel Xeon"},
            new () {Id=43,FeatureId=8,Value="Intel Pentium"},
            new () {Id=44,FeatureId=8,Value="Intel Celeron"},
            new () {Id=45,FeatureId=8,Value="Intel Atom"},

            new () {Id=46,FeatureId=9,Value="AMD Radeon RX 550"},
            new () {Id=47,FeatureId=9,Value="AMD Radeon RX 560"},
            new () {Id=48,FeatureId=9,Value="AMD Radeon RX 570"},
            new () {Id=49,FeatureId=9,Value="AMD Radeon RX 580"},            
            new () {Id=50,FeatureId=9,Value="AMD Radeon RX 590"},
            new () {Id=51,FeatureId=9,Value="AMD Radeon RX 5500 XT"},
            new () {Id=52,FeatureId=9,Value="AMD Radeon RX 5600 XT"},
            new () {Id=53,FeatureId=9,Value="AMD Radeon RX 5700 XT"},
            new () {Id=54,FeatureId=9,Value="AMD Radeon RX 6800 XT"},
            new () {Id=55,FeatureId=9,Value="AMD Radeon RX 6900 XT"},
            new () {Id=56,FeatureId=9,Value="Nvidia GeForce GT 710"},
            new () {Id=57,FeatureId=9,Value="Nvidia GeForce GT 730"},
            new () {Id=58,FeatureId=9,Value="Nvidia GeForce GT 1030"},
            new () {Id=59,FeatureId=9,Value="Nvidia GeForce GTX 1050"},
            new () {Id=60,FeatureId=9,Value="Nvidia GeForce GTX 1050 Ti"},
            new () {Id=61,FeatureId=9,Value="Nvidia GeForce GTX 1060"},
            new () {Id=62,FeatureId=9,Value="Nvidia GeForce GTX 1070"},
            new () {Id=63,FeatureId=9,Value="Nvidia GeForce GTX 1080"},
            new () {Id=64,FeatureId=9,Value="Nvidia GeForce GTX 1080 Ti"},
            new () {Id=65,FeatureId=9,Value="Nvidia GeForce GTX 1650"},
            new () {Id=67,FeatureId=9,Value="Nvidia GeForce GTX 1660"},
            new () {Id=69,FeatureId=9,Value="Nvidia GeForce GTX 1660 Ti"},
            new () {Id=70,FeatureId=9,Value="Nvidia GeForce GTX 1070 Ti"},
            new () {Id=71,FeatureId=9,Value="Nvidia GeForce GTX 1080 Ti"},
            new () {Id=72,FeatureId=9,Value="Nvidia GeForce RTX 2060"},
            new () {Id=74,FeatureId=9,Value="Nvidia GeForce RTX 2070"},
            new () {Id=76,FeatureId=9,Value="Nvidia GeForce RTX 2080"},
            new () {Id=78,FeatureId=9,Value="Nvidia GeForce RTX 2080 Ti"},
            new () {Id=79,FeatureId=9,Value="Nvidia GeForce RTX 3060"},
            new () {Id=80,FeatureId=9,Value="Nvidia GeForce RTX 3060 Ti"},
            new () {Id=81,FeatureId=9,Value="Nvidia GeForce RTX 3070"},
            new () {Id=82,FeatureId=9,Value="Nvidia GeForce RTX 3070 Ti"},
            new () {Id=83,FeatureId=9,Value="Nvidia GeForce RTX 3080"},
            new () {Id=84,FeatureId=9,Value="Nvidia GeForce RTX 3080 Ti"},
            new () {Id=85,FeatureId=9,Value="Nvidia GeForce RTX 3090"},

            new () {Id=86,FeatureId=12,Value="Windows 10"},
            new () {Id=87,FeatureId=12,Value="Windows 11"},
            new () {Id=88,FeatureId=12,Value="Mac OS"},
            new () {Id=89,FeatureId=12,Value="Linux"},
            new () {Id=90,FeatureId=12,Value="FreeDos"},

            new () {Id=91,FeatureId=13,Value="13.3 Inch"},
            new () {Id=92,FeatureId=13,Value="14 Inch"},
            new () {Id=93,FeatureId=13,Value="15.6 Inch"},
            new () {Id=94,FeatureId=13,Value="17.3 Inch"},
            new () {Id=95,FeatureId=13,Value="21.5 Inch"},
            new () {Id=96,FeatureId=13,Value="23.8 Inch"},
            new () {Id=97,FeatureId=13,Value="27 Inch"},
            new () {Id=98,FeatureId=13,Value="32 Inch"},
            new () {Id=99,FeatureId=13,Value="34 Inch"},

            new () {Id=100,FeatureId=11,Value="4 GB"},
            new () {Id=101,FeatureId=11,Value="8 GB"},
            new () {Id=102,FeatureId=11,Value="16 GB"},
            new () {Id=103,FeatureId=11,Value="32 GB"},
            new () {Id=104,FeatureId=11,Value="64 GB"},
            new () {Id=105,FeatureId=11,Value="128 GB"},

            new () {Id=106,FeatureId=16,Value="32 Inch"},
            new () {Id=107,FeatureId=16,Value="40 Inch"},
            new () {Id=108,FeatureId=16,Value="43 Inch"},
            new () {Id=109,FeatureId=16,Value="50 Inch"},
            new () {Id=110,FeatureId=16,Value="55 Inch"},
            new () {Id=111,FeatureId=16,Value="65 Inch"},
            new () {Id=112,FeatureId=16,Value="75 Inch"},

            new () {Id=113,FeatureId=17,Value="QLED"},
            new () {Id=114,FeatureId=17,Value="OLED"},
            new () {Id=115,FeatureId=17,Value="LED"},
            new () {Id=116,FeatureId=17,Value="LCD"},
            new () {Id=117,FeatureId=17,Value="Plazma"},
            new () {Id=118,FeatureId=17,Value="Curved"},

            new () {Id=120,FeatureId=18,Value="HD"},
            new () {Id=121,FeatureId=18,Value="Full HD"},
            new () {Id=122,FeatureId=18,Value="2K"},
            new () {Id=123,FeatureId=18,Value="4K"},
            new () {Id=124,FeatureId=18,Value="8K"},

            new () {Id=126,FeatureId=19,Value="DDR3"},
            new () {Id=127,FeatureId=19,Value="DDR4"},
            new () {Id=128,FeatureId=19,Value="DDR5"},

            new () {Id=129,FeatureId=20,Value="2"},
            new () {Id=130,FeatureId=20,Value="4"},
            new () {Id=131,FeatureId=20,Value="6"},
            new () {Id=132,FeatureId=20,Value="8"},

            new () {Id=133,FeatureId=21,Value="Bluetooth 4.0"},
            new () {Id=134,FeatureId=21,Value="Bluetooth 4.1"},
            new () {Id=135,FeatureId=21,Value="Bluetooth 4.2"},
            new () {Id=136,FeatureId=21,Value="Bluetooth 5.0"},
            new () {Id=137,FeatureId=21,Value="Bluetooth 5.1"},
            new () {Id=138,FeatureId=21,Value="Yok"},

            new () {Id=139,FeatureId=22,Value="500 Watt"},
            new () {Id=140,FeatureId=22,Value="600 Watt"},
            new () {Id=141,FeatureId=22,Value="650 Watt"},
            new () {Id=142,FeatureId=22,Value="700 Watt"},
            new () {Id=143,FeatureId=22,Value="750 Watt"},

            new () {Id=144,FeatureId=23,Value="120 GB"},
            new () {Id=145,FeatureId=23,Value="240 GB"},
            new () {Id=146,FeatureId=23,Value="256 GB"},
            new () {Id=147,FeatureId=23,Value="480 GB"},
            new () {Id=148,FeatureId=23,Value="500 GB"},
            new () {Id=149,FeatureId=23,Value="512 GB"},
            new () {Id=150,FeatureId=23,Value="1 TB"},
            new () {Id=151,FeatureId=23,Value="2 TB"},
            new () {Id=152,FeatureId=23,Value="4 TB"},
            new () {Id=153,FeatureId=23,Value="8 TB"},
            new () {Id=154,FeatureId=23,Value="16 TB"},

            new () {Id=155,FeatureId=24,Value="500-600 MB/s"},
            new () {Id=156,FeatureId=24,Value="600-800 MB/s"},
            new () {Id=157,FeatureId=24,Value="800-1000 MB/s"},
            new () {Id=158,FeatureId=24,Value="1000-1200 MB/s"},
            new () {Id=159,FeatureId=24,Value="1200-1400 MB/s"},
            new () {Id=160,FeatureId=24,Value="1400-1600 MB/s"},
            new () {Id=161,FeatureId=24,Value="1600-1800 MB/s"},
            new () {Id=162,FeatureId=24,Value="1800-2000 MB/s"},
            new () {Id=163,FeatureId=24,Value="2000-2200 MB/s"},
            new () {Id=164,FeatureId=24,Value="2200-2400 MB/s"},
            new () {Id=165,FeatureId=24,Value="2400-2600 MB/s"},
            new () {Id=166,FeatureId=24,Value="2600-2800 MB/s"},
            new () {Id=167,FeatureId=24,Value="2800-3000 MB/s"},
            new () {Id=168,FeatureId=24,Value="3000-3200 MB/s"},
            new () {Id=169,FeatureId=24,Value="3200-3400 MB/s"},
            new () {Id=170,FeatureId=24,Value="3400-3600 MB/s"},
            new () {Id=171,FeatureId=24,Value="3600-3800 MB/s"},
            new () {Id=172,FeatureId=24,Value="3800-4000 MB/s"},

            new () {Id=173,FeatureId=25,Value="500-600 MB/s"},
            new () {Id=174,FeatureId=25,Value="600-800 MB/s"},
            new () {Id=175,FeatureId=25,Value="800-1000 MB/s"},
            new () {Id=176,FeatureId=25,Value="1000-1200 MB/s"},
            new () {Id=177,FeatureId=25,Value="1200-1400 MB/s"},
            new () {Id=178,FeatureId=25,Value="1400-1600 MB/s"},
            new () {Id=179,FeatureId=25,Value="1600-1800 MB/s"},
            new () {Id=180,FeatureId=25,Value="1800-2000 MB/s"},
            new () {Id=181,FeatureId=25,Value="2000-2200 MB/s"},
            new () {Id=182,FeatureId=25,Value="2200-2400 MB/s"},
            new () {Id=183,FeatureId=25,Value="2400-2600 MB/s"},
            new () {Id=184,FeatureId=25,Value="2600-2800 MB/s"},
            new () {Id=185,FeatureId=25,Value="2800-3000 MB/s"},            
            new () {Id=186,FeatureId=25,Value="3000-3200 MB/s"},
            new () {Id=187,FeatureId=25,Value="3200-3400 MB/s"},
            new () {Id=188,FeatureId=25,Value="3400-3600 MB/s"},
            new () {Id=189,FeatureId=25,Value="3600-3800 MB/s"},
            new () {Id=190,FeatureId=25,Value="3800-4000 MB/s"},

            new () {Id=191,FeatureId=26,Value="4 GB"},
            new () {Id=192,FeatureId=26,Value="8 GB"},
            new () {Id=193,FeatureId=26,Value="16 GB"},
            new () {Id=194,FeatureId=26,Value="32 GB"},
            new () {Id=195,FeatureId=26,Value="64 GB"},
            new () {Id=196,FeatureId=26,Value="128 GB"},

            new () {Id=197,FeatureId=28,Value="2133 MHz"},
            new () {Id=198,FeatureId=28,Value="2400 MHz"},
            new () {Id=199,FeatureId=28,Value="2666 MHz"},
            new () {Id=200,FeatureId=28,Value="3000 MHz"},
            new () {Id=201,FeatureId=28,Value="3200 MHz"},
            new () {Id=202,FeatureId=28,Value="3600 MHz"},
            new () {Id=203,FeatureId=28,Value="4000 MHz"},

            new () {Id=204,FeatureId=31,Value="1.0 GHz"},
            new () {Id=205,FeatureId=31,Value="1.2 GHz"},
            new () {Id=206,FeatureId=31,Value="1.4 GHz"},
            new () {Id=207,FeatureId=31,Value="1.6 GHz"},
            new () {Id=208,FeatureId=31,Value="1.8 GHz"},
            new () {Id=209,FeatureId=31,Value="2.0 GHz"},
            new () {Id=210,FeatureId=31,Value="2.2 GHz"},
            new () {Id=211,FeatureId=31,Value="2.4 GHz"},
            new () {Id=212,FeatureId=31,Value="2.6 GHz"},
            new () {Id=213,FeatureId=31,Value="2.8 GHz"},
            new () {Id=214,FeatureId=31,Value="3.0 GHz"},
            new () {Id=215,FeatureId=31,Value="3.2 GHz"},
            new () {Id=216,FeatureId=31,Value="3.4 GHz"},
            new () {Id=217,FeatureId=31,Value="3.6 GHz"},
            new () {Id=218,FeatureId=31,Value="3.8 GHz"},
            new () {Id=219,FeatureId=31,Value="4.0 GHz"},
            new () {Id=220,FeatureId=31,Value="4.2 GHz"},
            new () {Id=221,FeatureId=31,Value="4.4 GHz"},
            new () {Id=222,FeatureId=31,Value="4.6 GHz"},
            new () {Id=223,FeatureId=31,Value="4.8 GHz"},

            new () {Id=224,FeatureId=32,Value="2"},
            new () {Id=225,FeatureId=32,Value="4"},
            new () {Id=226,FeatureId=32,Value="6"},
            new () {Id=227,FeatureId=32,Value="8"},
            new () {Id=228,FeatureId=32,Value="10"},
            new () {Id=229,FeatureId=32,Value="12"},
            new () {Id=230,FeatureId=32,Value="16"},

            new () {Id=231,FeatureId=33,Value="Var"},
            new () {Id=232,FeatureId=33,Value="Yok"},

            new () {Id=233,FeatureId=34,Value="Siyah"},
            new () {Id=234,FeatureId=34,Value="Beyaz"},
            new () {Id=235,FeatureId=34,Value="Mavi"},
            new () {Id=236,FeatureId=34,Value="Kırmızı"},
            new () {Id=237,FeatureId=34,Value="Yeşil"},
            new () {Id=238,FeatureId=34,Value="Sarı"},
            new () {Id=239,FeatureId=34,Value="Turuncu"},
            new () {Id=240,FeatureId=34,Value="Pembe"},
            new () {Id=241,FeatureId=34,Value="Mor"},

            new () {Id=242,FeatureId=35,Value="5000 mAh"},
            new () {Id=243,FeatureId=35,Value="10000 mAh"},
            new () {Id=244,FeatureId=35,Value="20000 mAh"},
            new () {Id=245,FeatureId=35,Value="30000 mAh"},
            new () {Id=246,FeatureId=35,Value="40000 mAh"},

            new () {Id=247,FeatureId=36,Value="12-13 Inch"},
            new () {Id=248,FeatureId=36,Value="14-15 Inch"},
            new () {Id=249,FeatureId=36,Value="15-16 Inch"},
            new () {Id=250,FeatureId=36,Value="17-18 Inch"},

            new () {Id=251,FeatureId=10,Value="120 GB"},
            new () {Id=252,FeatureId=10,Value="240 GB"},
            new () {Id=253,FeatureId=10,Value="256 GB"},
            new () {Id=254,FeatureId=10,Value="480 GB"},
            new () {Id=255,FeatureId=10,Value="500 GB"},
            new () {Id=256,FeatureId=10,Value="512 GB"},
            new () {Id=257,FeatureId=10,Value="1 TB"},
            new () {Id=258,FeatureId=10,Value="2 TB"},
            new () {Id=259,FeatureId=10,Value="4 TB"},

            new () {Id=260,FeatureId=14,Value="Var"},
            new () {Id=261,FeatureId=14,Value="Yok"},

            new () {Id=262,FeatureId=15,Value="1366x768"},
            new () {Id=263,FeatureId=15,Value="1600x900"},
            new () {Id=264,FeatureId=15,Value="1920x1080"},
            new () {Id=265,FeatureId=15,Value="2560x1440"},
        };
    }
}