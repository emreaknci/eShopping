using CatalogService.API.Models;
using Npgsql;
using Polly;
using Polly.Retry;

namespace CatalogService.API.Context
{
    public class SeedData
    {
        public static IEnumerable<Brand> Brands()
        {
            var brands = new List<Brand>();

            foreach (var item in brands)
            {
                item.IsDeleted = false;
                item.Status = true;
                item.CreatedDate = DateTime.UtcNow;

                brands.Add(item);
            }
            return brands;
        }

        public static IEnumerable<Category> Categories()
        {
            var categories = new List<Category>();

            foreach (var item in categories)
            {
                item.IsDeleted = false;
                item.Status = true;
                item.CreatedDate = DateTime.UtcNow;

                categories.Add(item);
            }
            return categories;
        }

        public static IEnumerable<Feature> Features()
        {
            var features = new List<Feature>();

            foreach (var item in features)
            {
                item.IsDeleted = false;
                item.Status = true;
                item.CreatedDate = DateTime.UtcNow;

                features.Add(item);
            }
            return features;
        }

        public static IEnumerable<CategoryFeature> CategoryFeatures()
        {
            var categoryFeatures = new List<CategoryFeature>();

            foreach (var item in categoryFeatures)
            {
                item.IsDeleted = false;
                item.Status = true;
                item.CreatedDate = DateTime.UtcNow;

                categoryFeatures.Add(item);
            }
            return categoryFeatures;
        }

        public static IEnumerable<FeatureValue> FeatureValues()
        {
            var featureValues = new List<FeatureValue>();

            foreach (var item in featureValues)
            {
                item.IsDeleted = false;
                item.Status = true;
                item.CreatedDate = DateTime.UtcNow;

                featureValues.Add(item);
            }
            return featureValues;
        }
        private IEnumerable<Brand> brands => new List<Brand>
        {
            new () {Id=1, Name = "Apple" },
            new () {Id=2, Name = "Samsung" },
            new () {Id=3, Name = "Lenovo" },
            new () {Id=4, Name = "Asus" },
            new () {Id=5, Name = "Huawei" },
            new () {Id=6, Name = "MSI" },
            new () {Id=7, Name = "Dell" },
            new () {Id=8, Name = "Acer" },
            new () {Id=9, Name = "HP" },
            new () {Id=10, Name = "Vestel" },
            new () {Id=11, Name = "Casper" },
            new () {Id=12, Name = "Xiaomi" },
            new () {Id=13, Name = "Monster" },
            new () {Id=14, Name = "Philips" },
            new () {Id=15, Name = "Gigabyte" },
            new () {Id=16, Name = "Arzum" },
            new () {Id=17, Name = "Canon" },
            new () {Id=18, Name = "Sony" },
            new () {Id=19, Name = "LG" },
            new () {Id=20, Name = "Beko" },
            new () {Id=21, Name = "Intel" },
            new () {Id=22, Name = "AMD" },
            new () {Id=23, Name = "Nvidia" },
            new () {Id=24, Name = "Corsair" },
            new () {Id=25, Name = "Kingston" },
            new () {Id=26, Name = "Crucial" },
            new () {Id=27, Name = "Samsung" },
            new () {Id=28, Name = "Seagate" },
            new () {Id=29, Name = "Logitech" },
            new () {Id=30, Name = "Razer" },
            new () {Id=31, Name = "HyperX" },
            new () {Id=32, Name = "A4Tech" },
            new () {Id=33, Name = "JBL" },
        };

        private IEnumerable<Category> categories => new List<Category>
        {
            new () {Id=1, Name = "Telefon" },
            new () {Id=2, Name = "Bilgisayar" },
            new () {Id=3, Name = "Ses" },
            new () {Id=4, Name = "Depolama" },
            new () {Id=5, Name = "Laptop",ParentCategoryId=2 },
            new () {Id=6, Name = "Masaüstü",ParentCategoryId=2 },
            new () {Id=7, Name = "Tablet",ParentCategoryId=2 },
            new () {Id=8, Name = "Kulaklık",ParentCategoryId=3 },
            new () {Id=9, Name = "Hoparlör",ParentCategoryId=3 },
        };

        private IEnumerable<Feature> features = new List<Feature>()
        {
            new (){Id=1, Name="Ekran Boyutu"},
            new (){Id=2, Name="Dahili Hafıza"},
            new (){Id=3, Name="Mobil Ram Boyutu"},
            new (){Id=4, Name="Ram (Sistem Belleği)"},
            new (){Id=5, Name="Batarya Kapasitesi"},
            new (){Id=6, Name="İşletim Sistemi"},
            new (){Id=7, Name="Renk"},
            new (){Id=8, Name="Suya Dayanıklılık"},
            new (){Id=9, Name="Ekran Yenileme Hızı"},
            new (){Id=10, Name="Çözünürlük"},
            new (){Id=11, Name="Tere Dayanaklılık"},
            new (){Id=12, Name="Kablosuz Şarj"},
            new (){Id=13, Name="Hoparlör Gücü"},
        };

        private IEnumerable<CategoryFeature> categoryFeatures = new List<CategoryFeature>()
        {
            new () {Id=1, CategoryId=1, FeatureId=2},
            new () {Id=2, CategoryId=1, FeatureId=3},
            new () {Id=3, CategoryId=1, FeatureId=5},
            new () {Id=4, CategoryId=1, FeatureId=7},
            new () {Id=5, CategoryId=1, FeatureId=9},

            new () {Id=6, CategoryId=2, FeatureId=2},
            new () {Id=7, CategoryId=2, FeatureId=4},
            new () {Id=8, CategoryId=2, FeatureId=6},

            new () {Id=9, CategoryId=8, FeatureId=12},
            new () {Id=10, CategoryId=8, FeatureId=11},
            new () {Id=11, CategoryId=9, FeatureId=13},

            new () {Id=12, CategoryId=4, FeatureId=2},

            new () {Id=13, CategoryId=5, FeatureId=1},
            new () {Id=14, CategoryId=5, FeatureId=5},
            new () {Id=15, CategoryId=5, FeatureId=9},
            new () {Id=16, CategoryId=5, FeatureId=10},

            new () {Id=17, CategoryId=7, FeatureId=1},
            new () {Id=18, CategoryId=7, FeatureId=5},
            new () {Id=19, CategoryId=7, FeatureId=9},
            new () {Id=20, CategoryId=7, FeatureId=10},

            new () {Id=21, CategoryId=8, FeatureId=12},

            new () {Id=22, CategoryId=9, FeatureId=13},
        };

        private IEnumerable<FeatureValue> featureValues = new List<FeatureValue>()
        {
            new () {Id=1, FeatureId=1, Value="6.5 inch"},
            new () {Id=2, FeatureId=1, Value="6.7 inch"},
            new () {Id=3, FeatureId=1, Value="7 inch"},
            new () {Id=4, FeatureId=1, Value="12.4 inch"},
            new () {Id=5, FeatureId=1, Value="13.3 inch"},
            new () {Id=6, FeatureId=1, Value="15.6 inch"},
            new () {Id=7, FeatureId=1, Value="17.3 inch"},
            new () {Id=8, FeatureId=1, Value="21.5 inch"},
            new () {Id=9, FeatureId=1, Value="24 inch"},
            new () {Id=10, FeatureId=1, Value="27 inch"},
            new () {Id=11, FeatureId=1, Value="32 inch"},
            new () {Id=12, FeatureId=1, Value="34 inch"},
            new () {Id=13, FeatureId=1, Value="49 inch"},
            new () {Id=14, FeatureId=1, Value="55 inch"},
            new () {Id=15, FeatureId=1, Value="65 inch"},
            new () {Id=16, FeatureId=1, Value="75 inch"},
            new () {Id=17, FeatureId=1, Value="85 inch"},
            new () {Id=18, FeatureId=1, Value="100 inch"},

            new () {Id=19, FeatureId=2, Value="16 GB"},
            new () {Id=20, FeatureId=2, Value="32 GB"},
            new () {Id=21, FeatureId=2, Value="64 GB"},
            new () {Id=22, FeatureId=2, Value="128 GB"},
            new () {Id=23, FeatureId=2, Value="256 GB"},
            new () {Id=24, FeatureId=2, Value="512 GB"},
            new () {Id=25, FeatureId=2, Value="1 TB"},
            new () {Id=26, FeatureId=2, Value="2 TB"},
            new () {Id=27, FeatureId=2, Value="4 TB"},
            new () {Id=28, FeatureId=2, Value="8 TB"},
            new () {Id=29, FeatureId=2, Value="16 TB"},

            new () {Id=30, FeatureId=3, Value="2 GB"},
            new () {Id=31, FeatureId=3, Value="3 GB"},
            new () {Id=32, FeatureId=3, Value="4 GB"},
            new () {Id=33, FeatureId=3, Value="6 GB"},
            new () {Id=34, FeatureId=3, Value="8 GB"},
            new () {Id=35, FeatureId=3, Value="12 GB"},

            new () {Id=36, FeatureId=4, Value="4 GB"},
            new () {Id=37, FeatureId=4, Value="8 GB"},
            new () {Id=38, FeatureId=4, Value="16 GB"},
            new () {Id=39, FeatureId=4, Value="32 GB"},
            new () {Id=40, FeatureId=4, Value="64 GB"},
            new () {Id=41, FeatureId=4, Value="128 GB"},

            new () {Id=42, FeatureId=5, Value="3000 mAh"},
            new () {Id=43, FeatureId=5, Value="4000 mAh"},
            new () {Id=44, FeatureId=5, Value="5000 mAh"},
            new () {Id=45, FeatureId=5, Value="6000 mAh"},
            new () {Id=46, FeatureId=5, Value="7000 mAh"},
            new () {Id=47, FeatureId=5, Value="8000 mAh"},

            new () {Id=48, FeatureId=6, Value="FreeDOS"},
            new () {Id=49, FeatureId=6, Value="Windows 10"},
            new () {Id=50, FeatureId=6, Value="Windows 11"},
            new () {Id=51, FeatureId=6, Value="MacOS"},
            new () {Id=52, FeatureId=6, Value="Linux"},
            new () {Id=53, FeatureId=6, Value="Android"},
            new () {Id=54, FeatureId=6, Value="iOS"},

            new () {Id=55, FeatureId=7, Value="Siyah"},
            new () {Id=56, FeatureId=7, Value="Beyaz"},
            new () {Id=57, FeatureId=7, Value="Gri"},
            new () {Id=58, FeatureId=7, Value="Mavi"},
            new () {Id=59, FeatureId=7, Value="Kırmızı"},

            new () {Id=60, FeatureId=8, Value="Var"},
            new () {Id=61, FeatureId=8, Value="Yok"},

            new () {Id=62, FeatureId=9, Value="60 Hz"},
            new () {Id=63, FeatureId=9, Value="90 Hz"},
            new () {Id=64, FeatureId=9, Value="120 Hz"},
            new () {Id=65, FeatureId=9, Value="144 Hz"},
            new () {Id=66, FeatureId=9, Value="165 Hz"},

            new () {Id=67, FeatureId=10, Value="1240x960"},
            new () {Id=68, FeatureId=10, Value="1280x720"},
            new () {Id=69, FeatureId=10, Value="1920x1080"},
            new () {Id=70, FeatureId=10, Value="2560x1440"},

            new () {Id=71, FeatureId=11, Value="Var"},
            new () {Id=72, FeatureId=11, Value="Yok"},

            new () {Id=73, FeatureId=12, Value="Var"},
            new () {Id=74, FeatureId=12, Value="Yok"},

            new () {Id=75, FeatureId=13, Value="3 W"},
            new () {Id=76, FeatureId=13, Value="5 W"},
            new () {Id=77, FeatureId=13, Value="10 W"},
            new () {Id=78, FeatureId=13, Value="20 W"},
            new () {Id=79, FeatureId=13, Value="30 W"},
            new () {Id=80, FeatureId=13, Value="50 W"},
        };
    }
}
