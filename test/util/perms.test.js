import * as subject from '../../src/util/perms.js';
import { range } from '../../index.js';

const combos = [
  null,
  [['']],
  [[''],['0','1']],
  [[''],['0','1','2'],['01','02','12']],
  [[''],['0','1','2','3'],['01','02','03','12','13','23'],['012','013','023','123']],
  [[''],['0','1','2','3','4'],['01','02','03','04','12','13','14','23','24','34'],['012','013','014','023','024','034','123','124','134','234'],['0123','0124','0134','0234','1234']],
  [[''],['0','1','2','3','4','5'],['01','02','03','04','05','12','13','14','15','23','24','25','34','35','45'],['012','013','014','015','023','024','025','034','035','045','123','124','125','134','135','145','234','235','245','345'],['0123','0124','0125','0134','0135','0145','0234','0235','0245','0345','1234','1235','1245','1345','2345'],['01234','01235','01245','01345','02345','12345']],
  [[''],['0','1','2','3','4','5','6'],['01','02','03','04','05','06','12','13','14','15','16','23','24','25','26','34','35','36','45','46','56'],['012','013','014','015','016','023','024','025','026','034','035','036','045','046','056','123','124','125','126','134','135','136','145','146','156','234','235','236','245','246','256','345','346','356','456'],['0123','0124','0125','0126','0134','0135','0136','0145','0146','0156','0234','0235','0236','0245','0246','0256','0345','0346','0356','0456','1234','1235','1236','1245','1246','1256','1345','1346','1356','1456','2345','2346','2356','2456','3456'],['01234','01235','01236','01245','01246','01256','01345','01346','01356','01456','02345','02346','02356','02456','03456','12345','12346','12356','12456','13456','23456'],['012345','012346','012356','012456','013456','023456','123456']],
  [[''],['0','1','2','3','4','5','6','7'],['01','02','03','04','05','06','07','12','13','14','15','16','17','23','24','25','26','27','34','35','36','37','45','46','47','56','57','67'],['012','013','014','015','016','017','023','024','025','026','027','034','035','036','037','045','046','047','056','057','067','123','124','125','126','127','134','135','136','137','145','146','147','156','157','167','234','235','236','237','245','246','247','256','257','267','345','346','347','356','357','367','456','457','467','567'],['0123','0124','0125','0126','0127','0134','0135','0136','0137','0145','0146','0147','0156','0157','0167','0234','0235','0236','0237','0245','0246','0247','0256','0257','0267','0345','0346','0347','0356','0357','0367','0456','0457','0467','0567','1234','1235','1236','1237','1245','1246','1247','1256','1257','1267','1345','1346','1347','1356','1357','1367','1456','1457','1467','1567','2345','2346','2347','2356','2357','2367','2456','2457','2467','2567','3456','3457','3467','3567','4567'],['01234','01235','01236','01237','01245','01246','01247','01256','01257','01267','01345','01346','01347','01356','01357','01367','01456','01457','01467','01567','02345','02346','02347','02356','02357','02367','02456','02457','02467','02567','03456','03457','03467','03567','04567','12345','12346','12347','12356','12357','12367','12456','12457','12467','12567','13456','13457','13467','13567','14567','23456','23457','23467','23567','24567','34567'],['012345','012346','012347','012356','012357','012367','012456','012457','012467','012567','013456','013457','013467','013567','014567','023456','023457','023467','023567','024567','034567','123456','123457','123467','123567','124567','134567','234567'],['0123456','0123457','0123467','0123567','0124567','0134567','0234567','1234567']],
  [[''],['0','1','2','3','4','5','6','7','8'],['01','02','03','04','05','06','07','08','12','13','14','15','16','17','18','23','24','25','26','27','28','34','35','36','37','38','45','46','47','48','56','57','58','67','68','78'],['012','013','014','015','016','017','018','023','024','025','026','027','028','034','035','036','037','038','045','046','047','048','056','057','058','067','068','078','123','124','125','126','127','128','134','135','136','137','138','145','146','147','148','156','157','158','167','168','178','234','235','236','237','238','245','246','247','248','256','257','258','267','268','278','345','346','347','348','356','357','358','367','368','378','456','457','458','467','468','478','567','568','578','678'],['0123','0124','0125','0126','0127','0128','0134','0135','0136','0137','0138','0145','0146','0147','0148','0156','0157','0158','0167','0168','0178','0234','0235','0236','0237','0238','0245','0246','0247','0248','0256','0257','0258','0267','0268','0278','0345','0346','0347','0348','0356','0357','0358','0367','0368','0378','0456','0457','0458','0467','0468','0478','0567','0568','0578','0678','1234','1235','1236','1237','1238','1245','1246','1247','1248','1256','1257','1258','1267','1268','1278','1345','1346','1347','1348','1356','1357','1358','1367','1368','1378','1456','1457','1458','1467','1468','1478','1567','1568','1578','1678','2345','2346','2347','2348','2356','2357','2358','2367','2368','2378','2456','2457','2458','2467','2468','2478','2567','2568','2578','2678','3456','3457','3458','3467','3468','3478','3567','3568','3578','3678','4567','4568','4578','4678','5678'],['01234','01235','01236','01237','01238','01245','01246','01247','01248','01256','01257','01258','01267','01268','01278','01345','01346','01347','01348','01356','01357','01358','01367','01368','01378','01456','01457','01458','01467','01468','01478','01567','01568','01578','01678','02345','02346','02347','02348','02356','02357','02358','02367','02368','02378','02456','02457','02458','02467','02468','02478','02567','02568','02578','02678','03456','03457','03458','03467','03468','03478','03567','03568','03578','03678','04567','04568','04578','04678','05678','12345','12346','12347','12348','12356','12357','12358','12367','12368','12378','12456','12457','12458','12467','12468','12478','12567','12568','12578','12678','13456','13457','13458','13467','13468','13478','13567','13568','13578','13678','14567','14568','14578','14678','15678','23456','23457','23458','23467','23468','23478','23567','23568','23578','23678','24567','24568','24578','24678','25678','34567','34568','34578','34678','35678','45678'],['012345','012346','012347','012348','012356','012357','012358','012367','012368','012378','012456','012457','012458','012467','012468','012478','012567','012568','012578','012678','013456','013457','013458','013467','013468','013478','013567','013568','013578','013678','014567','014568','014578','014678','015678','023456','023457','023458','023467','023468','023478','023567','023568','023578','023678','024567','024568','024578','024678','025678','034567','034568','034578','034678','035678','045678','123456','123457','123458','123467','123468','123478','123567','123568','123578','123678','124567','124568','124578','124678','125678','134567','134568','134578','134678','135678','145678','234567','234568','234578','234678','235678','245678','345678'],['0123456','0123457','0123458','0123467','0123468','0123478','0123567','0123568','0123578','0123678','0124567','0124568','0124578','0124678','0125678','0134567','0134568','0134578','0134678','0135678','0145678','0234567','0234568','0234578','0234678','0235678','0245678','0345678','1234567','1234568','1234578','1234678','1235678','1245678','1345678','2345678'],['01234567','01234568','01234578','01234678','01235678','01245678','01345678','02345678','12345678']]
];

describe('factorial', () => {
  const badInputs = [-100, -10, -3, -2, -1];
  const facts = [
    1n, 1n, 2n, 6n, 24n, 120n, 720n, 5040n, 40320n, 362880n,
    3628800n,
    39916800n,
    479001600n,
    6227020800n,
    87178291200n,
    1307674368000n,
    20922789888000n,
    355687428096000n,
    6402373705728000n,
    121645100408832000n,
    2432902008176640000n,
    51090942171709440000n,
    1124000727777607680000n,
    25852016738884976640000n,
    620448401733239439360000n,
    15511210043330985984000000n,
    403291461126605635584000000n,
    10888869450418352160768000000n,
    304888344611713860501504000000n,
    8841761993739701954543616000000n,
    265252859812191058636308480000000n,
    8222838654177922817725562880000000n,
    263130836933693530167218012160000000n
  ];
  // For stress test
  const largeN = 1<<16;

  describe('for negative inputs', () => {
    test('throws', () => {
      badInputs.forEach(n => {
        expect(() => subject.factorial(n), `factorial(${n}) expected to throw`).toThrow();
      });
    });
  });

  test('returns the first few expected values', () => {
    facts.forEach((expected, n) => {
      expect(subject.factorial(n), `factorial(${n}) expected ${expected}`).toBe(expected);
    });
  });

  test('can handle large n', () => { subject.factorial(largeN); });
});

describe('permutation', () => {
  const permsExpected = [
    // BAD INPUTS
    // n < 0
    { n: -10, r: 0n, expected: 'err' },
    { n: -2, r: 0n, expected: 'err' },
    { n: -1, r: 0n, expected: 'err' },
    // r < 0
    { n: 0, r: -10n, expected: 'err' },
    { n: 0, r: -2n, expected: 'err' },
    { n: 0, r: -1n, expected: 'err' },
    // r >= n!
    { n: 0, r: 2n, expected: 'err' },
    { n: 1, r: 2n, expected: 'err' },
    { n: 10, r: 3628800n + 1n, expected: 'err' },

    // GOOD INPUTS
    { n: 0, r: 0n, expected: [] },
    { n: 1, r: 0n, expected: [0] },
    { n: 2, r: 0n, expected: [0, 1] },
    { n: 2, r: 1n, expected: [1, 0] },
    { n: 3, r: 0n, expected: [0, 1, 2] },
    { n: 3, r: 1n, expected: [0, 2, 1] },
    { n: 3, r: 2n, expected: [1, 0, 2] },
    { n: 3, r: 3n, expected: [1, 2, 0] },
    { n: 3, r: 4n, expected: [2, 0, 1] },
    { n: 3, r: 5n, expected: [2, 1, 0] },
    { n: 4, r: 0n, expected: [0, 1, 2, 3] },
    { n: 4, r: 1n, expected: [0, 1, 3, 2] },
    { n: 4, r: 2n, expected: [0, 2, 1, 3] },
    { n: 4, r: 3n, expected: [0, 2, 3, 1] },
    { n: 4, r: 4n, expected: [0, 3, 1, 2] },
    { n: 4, r: 5n, expected: [0, 3, 2, 1] },
    { n: 4, r: 6n, expected: [1, 0, 2, 3] },
    { n: 4, r: 7n, expected: [1, 0, 3, 2] },
    { n: 4, r: 8n, expected: [1, 2, 0, 3] },
    { n: 4, r: 9n, expected: [1, 2, 3, 0] },
    { n: 4, r: 10n, expected: [1, 3, 0, 2] },
    { n: 4, r: 11n, expected: [1, 3, 2, 0] },
    { n: 4, r: 12n, expected: [2, 0, 1, 3] },
    { n: 4, r: 13n, expected: [2, 0, 3, 1] },
    { n: 4, r: 14n, expected: [2, 1, 0, 3] },
    { n: 4, r: 15n, expected: [2, 1, 3, 0] },
    { n: 4, r: 16n, expected: [2, 3, 0, 1] },
    { n: 4, r: 17n, expected: [2, 3, 1, 0] },
    { n: 4, r: 18n, expected: [3, 0, 1, 2] },
    { n: 4, r: 19n, expected: [3, 0, 2, 1] },
    { n: 4, r: 20n, expected: [3, 1, 0, 2] },
    { n: 4, r: 21n, expected: [3, 1, 2, 0] },
    { n: 4, r: 22n, expected: [3, 2, 0, 1] },
    { n: 4, r: 23n, expected: [3, 2, 1, 0] },

    // Piece of cake.
    {
      n: 1010,
      r: 356379621448917474434312957290551465813162978310463560942136950186724696559930514459542616588548360340062615812243488425842829831933907076416213891046891062841494041466379077758817152750513059742663734323176668737724569422806140629968271362978058114859672996956451826009448416481176875449083503355502943110097843189658688418401897806367774697701960356312049337187195994395441902372739714180169969364996988308222951403815343076519550638806219814656310638396682452007739123222883631150109387444692074397021650917998546166460211762498516655551189174554022664354923436333631654459463087788725826301899994466951898781587703824280948224600991390485747670808489392466738005517472006366283482522344996144264162255183540638004022713613438777800467849258094553925252429753762468723240540344860154485562284981951120126168529138291934830737021191716062889214466230819901604155575258453618146237461843509372356772706100009433668362028624006004911310336449046325394099411837193462122297955403662826789406013829258039538752574646897934895134610089985522712263749459079083191466660099921386937475431469582629949753523149519772751451524306208748850794809727568917455786389862081236939315182245696973397838689895324387265532766426368855611517606040265841606759620141378356534895134937617069336861766884423840085666918536010443419791900535793507636950334055478446588030255283592896484486673114610037312155794426351316580570548780549761261615813611601493064654988400915996214418897927232564637550937467898401118461578150409427551988693355244542228056641830873893743126544702523116123386405612925241209004335970156696499909865132708591059302164104845347134584085088357438968570814729151413035703098036495962438862417379507601662474688156060333167442225258616264191769265188404838420566114215003281330680669344889898675680860953827618009136213986027222682494162015247393484452426077771266193846944730636656620654173151028591030072693660779580540144462959436928457357349885482778491431545566912408713938753990596806482959715298925346705143117416380332386969248934295505223952346928503986459526606239216120371794541960892394262678425822400518468718945949187854121355658259247903604585056552574715796872390446773578397936711093016915803698938140100137789544575590332628193172671868740925490536494972079351207426578455458678190703185742118135897482282712051090945238476812393655905559992891282726414053122262128216398082491542212605683343955993744324144607680833168455440568099135383767639332999858764679631304195943633132176000791481436939827510988573568161099974347759172057927060961447142688262293499245002172828676455401n,
      expected: [
        846, 819, 271, 91, 749, 526, 109, 409, 351, 117, 439, 826, 779, 691, 1002, 71,
        935, 742, 880, 708, 623, 484, 581, 308, 803, 429, 693, 41, 943, 202, 777, 954, 259, 638,
        641, 165, 366, 38, 889, 824, 490, 448, 746, 662, 791, 726, 927, 362, 257, 895, 234, 244,
        251, 841, 666, 959, 320, 78, 696, 571, 842, 408, 385, 588, 900, 266, 418, 389, 205, 302,
        300, 342, 222, 761, 348, 645, 427, 876, 359, 932, 140, 106, 715, 377, 260, 75, 131, 149,
        383, 863, 655, 242, 81, 309, 807, 747, 297, 333, 218, 397, 436, 510, 59, 381, 671, 952,
        237, 265, 316, 494, 808, 559, 15, 865, 268, 332, 148, 879, 270, 776, 420, 45, 811, 633,
        555, 1004, 505, 839, 529, 438, 93, 220, 364, 875, 162, 649, 160, 18, 974, 501, 925, 1009,
        155, 322, 608, 853, 169, 310, 861, 345, 908, 378, 778, 685, 375, 34, 579, 323, 334, 618,
        51, 79, 859, 937, 757, 567, 794, 962, 978, 82, 197, 907, 979, 607, 718, 240, 969, 582,
        132, 125, 930, 502, 353, 851, 997, 890, 480, 646, 28, 185, 350, 533, 977, 560, 284, 822,
        29, 679, 382, 147, 485, 313, 365, 860, 245, 522, 558, 443, 751, 325, 883, 21, 765, 788,
        901, 20, 209, 35, 254, 258, 898, 181, 710, 764, 553, 471, 133, 124, 449, 144, 318, 347,
        280, 689, 384, 470, 198, 373, 354, 40, 546, 892, 513, 584, 25, 758, 858, 386, 293, 814,
        395, 89, 105, 428, 915, 784, 756, 474, 252, 650, 837, 231, 54, 821, 772, 721, 743, 687,
        243, 405, 211, 340, 827, 128, 660, 672, 767, 403, 8, 984, 451, 305, 678, 543, 287, 625,
        413, 677, 307, 866, 442, 96, 157, 896, 482, 576, 768, 905, 296, 275, 855, 171, 476, 324,
        292, 684, 432, 870, 719, 288, 0, 910, 849, 611, 172, 387, 731, 227, 445, 840, 372, 503,
        55, 299, 431, 161, 85, 461, 6, 400, 991, 938, 123, 477, 683, 523, 126, 797, 77, 331, 379,
        118, 985, 57, 648, 512, 22, 100, 72, 817, 600, 957, 506, 369, 317, 110, 163, 315, 407,
        654, 84, 619, 575, 833, 720, 780, 626, 207, 844, 593, 519, 815, 634, 825, 16, 1006, 854,
        304, 248, 961, 964, 911, 444, 914, 3, 630, 712, 277, 464, 201, 177, 127, 282, 695, 812,
        208, 321, 90, 294, 700, 702, 850, 975, 24, 264, 319, 829, 363, 111, 956, 980, 556, 565,
        694, 775, 971, 986, 303, 899, 569, 225, 229, 130, 521, 47, 267, 456, 692, 857, 509, 398,
        190, 946, 632, 489, 769, 525, 421, 360, 1000, 174, 586, 955, 64, 568, 616, 741, 934, 818,
        539, 143, 311, 874, 50, 699, 441, 516, 504, 813, 358, 113, 852, 610, 376, 285, 659, 422,
        104, 286, 1005, 419, 970, 518, 585, 744, 368, 349, 701, 273, 88, 976, 1008, 374, 151, 542,
        940, 203, 921, 989, 32, 590, 551, 737, 868, 224, 219, 283, 301, 675, 76, 877, 73, 891,
        647, 447, 752, 636, 423, 188, 314, 7, 524, 396, 103, 594, 965, 168, 274, 922, 828, 601,
        142, 939, 154, 214, 199, 953, 996, 326, 944, 141, 466, 434, 473, 736, 9, 515, 538, 99,
        483, 673, 704, 878, 191, 835, 960, 37, 918, 972, 941, 888, 716, 42, 906, 717, 98, 424,
        192, 591, 481, 179, 628, 759, 371, 681, 339, 665, 291, 39, 622, 206, 640, 917, 615, 651,
        913, 150, 724, 246, 552, 11, 343, 491, 460, 189, 698, 121, 159, 580, 587, 920, 936, 609,
        928, 562, 327, 897, 115, 402, 847, 488, 344, 415, 94, 486, 945, 496, 643, 5, 356, 885,
        508, 983, 809, 498, 217, 745, 241, 919, 329, 738, 774, 909, 680, 722, 682, 800, 63, 223,
        178, 112, 164, 669, 406, 182, 823, 549, 520, 426, 830, 599, 430, 949, 987, 44, 729, 796,
        475, 416, 572, 748, 122, 792, 563, 83, 667, 500, 134, 993, 735, 734, 1, 755, 912, 816,
        570, 61, 810, 239, 982, 795, 306, 528, 357, 247, 19, 534, 963, 663, 70, 942, 967, 290,
        762, 621, 410, 532, 642, 697, 790, 175, 531, 425, 754, 637, 391, 272, 23, 992, 916, 644,
        492, 848, 732, 740, 452, 97, 135, 514, 166, 468, 69, 750, 467, 893, 256, 137, 958, 335,
        574, 598, 617, 437, 988, 440, 173, 981, 108, 176, 167, 66, 873, 236, 872, 843, 404, 493,
        550, 200, 606, 255, 535, 479, 56, 604, 781, 902, 620, 730, 435, 583, 947, 337, 770, 771,
        31, 101, 52, 706, 380, 92, 882, 639, 472, 603, 74, 1001, 869, 966, 107, 146, 856, 392,
        158, 994, 184, 544, 635, 924, 153, 2, 80, 577, 352, 499, 831, 232, 43, 457, 661, 62, 536,
        497, 249, 411, 805, 686, 183, 495, 87, 152, 903, 973, 53, 250, 733, 102, 204, 573, 212,
        629, 156, 328, 950, 631, 884, 49, 929, 713, 414, 904, 541, 58, 195, 782, 995, 548, 789,
        793, 46, 180, 592, 760, 370, 624, 455, 554, 652, 801, 763, 664, 596, 597, 462, 862, 804,
        119, 802, 968, 933, 557, 894, 478, 723, 210, 60, 279, 139, 170, 931, 26, 269, 361, 233,
        739, 215, 727, 786, 394, 612, 276, 881, 14, 653, 68, 433, 688, 330, 690, 703, 138, 469,
        338, 458, 399, 17, 341, 951, 990, 753, 417, 487, 657, 602, 887, 465, 65, 261, 547, 289,
        705, 187, 4, 714, 463, 454, 226, 948, 412, 263, 95, 566, 216, 120, 545, 355, 707, 298,
        136, 537, 709, 798, 253, 393, 10, 33, 450, 221, 670, 129, 530, 517, 114, 336, 213, 595,
        235, 346, 728, 388, 48, 1007, 845, 783, 27, 785, 799, 725, 312, 459, 390, 367, 806, 711,
        186, 230, 116, 1003, 871, 613, 36, 668, 281, 886, 295, 627, 564, 838, 656, 262, 832, 614,
        676, 836, 864, 13, 605, 12, 511, 926, 820, 578, 867, 446, 193, 527, 196, 773, 787, 86,
        145, 401, 999, 238, 540, 998, 228, 278, 589, 194, 658, 453, 766, 67, 30, 561, 834, 923,
        674, 507
      ]
    }
  ];

  test('performs as expected', () => {
    permsExpected.forEach(({ n, r, expected }) => {
      if (expected === 'err') {
        expect(() => subject.permutation(n, r), `permutation(${n}, ${r}) expected to throw`).toThrow();
      } else {
        expect(subject.permutation(n, r), `permutation(${n}, ${r}) expected ${expected}`).toStrictEqual(expected);
      }
    });
  });
});

describe('shuffle', () => {
  test('throws when input array is null', () => {
    expect(() => subject.shuffle(null)).toThrow();
  });

  test('returns empty array when input array is empty', () => {
    expect(subject.shuffle([])).toEqual([]);
  });

  test('returns the input array when it has less than 2 elements', () => {
    const NUM_TESTS = 100;
    for (let test = 0; test < NUM_TESTS; test++) {
      expect(subject.shuffle([1])).toEqual([1]);
    }
  });

  test('produces a fairly uniform distribution', () => {
    const N = 10;
    const NUM_SHUFFLES = 1000;
    let matrix = Array(N).fill(0).map(() => Array(N).fill(0));
    // We'll shuffle the numbers 0..N-1 NUM_SHUFFLES times and record the
    // frequency of each number in each position.
    for (let i = 0; i < NUM_SHUFFLES; i++) {
      const shuffled = subject.shuffle(range(N));
      for (let j = 0; j < N; j++) {
        matrix[j][shuffled[j]]++;
      }
    }

    // Calculate and print the stardard deviation of the frequencies.
    let sum = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        sum += matrix[i][j];
      }
    }
    const mean = sum / (N * N);
    let variance = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        variance += (matrix[i][j] - mean) ** 2;
      }
    }
    const stdDev = Math.sqrt(variance / (N * N));

    // The standard deviation should be less than 20% of the mean.
    // This is a very loose bound, but it's a simple test.
    expect(stdDev).toBeLessThan(0.2 * mean);
  });
});

describe('nChooseK', () => {
  const badInputs = [
    // n < 0
    { n: -10, k: 0, expected: 'err' },
    { n: -2, k: 0, expected: 'err' },
    { n: -1, k: 0, expected: 'err' },
    // k < 0
    { n: 0, k: -10, expected: 'err' },
    { n: 0, k: -2, expected: 'err' },
    { n: 0, k: -1, expected: 'err' },
    // k > n
    { n: 0, k: 2, expected: 'err' },
    { n: 1, k: 2, expected: 'err' },
    { n: 10, k: 11, expected: 'err' },
  ];
  const goodInputs = [
    { n: 0, expected: [1] },
    { n: 1, expected: [1, 1] },
    { n: 2, expected: [1, 2, 1] },
    { n: 3, expected: [1, 3, 3, 1] },
    { n: 4, expected: [1, 4, 6, 4, 1] },
    { n: 5, expected: [1, 5, 10, 10, 5, 1] },
    { n: 6, expected: [1, 6, 15, 20, 15, 6, 1] },
    { n: 7, expected: [1, 7, 21, 35, 35, 21, 7, 1] },
    { n: 8, expected: [1, 8, 28, 56, 70, 56, 28, 8, 1] },
    { n: 9, expected: [1, 9, 36, 84, 126, 126, 84, 36, 9, 1] },
    { n: 10, expected: [1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1] },
    { n: 11, expected: [1, 11, 55, 165, 330, 462, 462, 330, 165, 55, 11, 1] },
    { n: 12, expected: [1, 12, 66, 220, 495, 792, 924, 792, 495, 220, 66, 12, 1] }
  ];

  test('performs as expected', () => {
    badInputs.forEach(({ n, k, expected }) => {
      if (expected === 'err') {
        expect(() => subject.nChooseK(n, k), `nChooseK(${n}, ${k}) expected to throw`).toThrow();
      } else {
        expect(subject.nChooseK(n, k), `nChooseK(${n}, ${k}) expected ${expected}`).toBe(expected);
      }
    });

    goodInputs.forEach(({ n, expected }) => {
      expected.forEach((expectedValue, k) => {
        expect(
          Number(subject.nChooseK(n, k)),
          `nChooseK(${n}, ${k}) expected ${expectedValue}`
        ).toBe(expectedValue);
      });
    });
  });
});

describe('combo', () => {
  test('performs as expected', () => {
    const N = 10;

    // Generate all combos N choose K and verify that they match the expected
    // values from the pre-generated combos test fixture.
    for (let n = 1; n < N; n++) {
      for (let k = 0; k < n; k++) {
        const nck = subject.nChooseK(n, k);
        for (let r = 0n; r < nck; r++) {
          expect(subject.combo(n, k, r).join('')).toBe(combos[n][k][r]);
        }
      }
    }

    // Test all combos for uniqueness.
    for (let n = 1; n < 10; n++) {
      /** @type {string[]} */
      const comboSet = new Set();
      for (let k = 0; k < n; k++) {
        const nck = subject.nChooseK(n, k);
        for (let r = 0n; r < nck; r++) {
          const _comboStr = subject.combo(n, k, r).join('');
          expect(
            comboSet.has(_comboStr),
            `combo((${n} choose ${k}), r=${r} [${_comboStr}]) is not unique`
          ).toBe(false);
          comboSet.add(_comboStr);
        }
      }
    }
  });
});

describe('bitLength', () => {
  test('calculates the number of bits required to store the given unsigned bigint', () => {
    [
      { n: 0n, expected: 0 },
      { n: 1n, expected: 1 },
      { n: 2n, expected: 2 },
      { n: 3n, expected: 2 },
      { n: 4n, expected: 3 },
      { n: 7n, expected: 3 },
      { n: 8n, expected: 4 },
      { n: 15n, expected: 4 },
      { n: 16n, expected: 5 },
      { n: 31n, expected: 5 },
      { n: 32n, expected: 6 },
      { n: 63n, expected: 6 },
      { n: 64n, expected: 7 },
      { n: 127n, expected: 7 },
      { n: 128n, expected: 8 },
      { n: 255n, expected: 8 },
      { n: 256n, expected: 9 },
      { n: 511n, expected: 9 },
      { n: 512n, expected: 10 },
      { n: 1023n, expected: 10 },
      { n: 1024n, expected: 11 },
      { n: 2047n, expected: 11 },
      { n: 2048n, expected: 12 },
      { n: 4095n, expected: 12 },
      { n: 4096n, expected: 13 },
      { n: 8191n, expected: 13 },
      { n: 8192n, expected: 14 },
      { n: 16383n, expected: 14 },
      { n: 16384n, expected: 15 },
      { n: 32767n, expected: 15 },
      { n: 32768n, expected: 16 },
      { n: 65535n, expected: 16 },
      { n: 65536n, expected: 17 },
      { n: 131071n, expected: 17 },
      { n: 131072n, expected: 18 },
      { n: 262143n, expected: 18 },
      { n: 262144n, expected: 19 },
      { n: 141383060217536481862799697542n, expected: 97 },
      { n: 184813142392016790842646459707n, expected: 98 },
      { n: 514994434223024047778568435712n, expected: 99 },
      { n: 1159996790379937067950973929647n, expected: 100 },
    ].forEach(({ n, expected }) => {
      expect(subject.bitLength(n), `bitLength(${n}) expected ${expected}`).toBe(expected);
    });

    [
      [414856887881740073965728593681n, 99],
      [141383060217536481862799697542n, 97],
      [184813142392016790842646459707n, 98],
      [514994434223024047778568435712n, 99],
      [1159996790379937067950973929647n, 100],
      [381101659872745631035277052198n, 99],
      [1170801340026017371569760397298n, 100],
      [901386676344563059891669675397n, 100],
      [1060977509650157210085347947504n, 100],
      [675782894543969379802151692796n, 100],
      [1226311869746061357354768755160n, 100],
      [459864662556709936444962676825n, 99],
      [162429285339323834935542912023n, 98],
      [754195862158807866061032975058n, 100],
      [859140980937711533154450297855n, 100],
      [861545769879643469175880332194n, 100],
      [353127639855704906746689959867n, 99],
      [1144164724605619946730021182953n, 100],
      [768622242651426754394941299162n, 100],
      [887924384473628454576566940816n, 100],
      [222020400023661409964239738920n, 98],
      [955712853985511478719782269495n, 100],
      [1003351994378562191159311935313n, 100],
      [359188954937423310647299150878n, 99],
      [605061469138650290221098853384n, 99],
      [928962030311158486197863521364n, 100],
      [1183579948707951216715558707100n, 100],
      [902705046058715018184278560301n, 100],
      [316837591006297311168082261756n, 98],
      [621651541385240320899721549484n, 99],
      [533478057368102944199454084771n, 99],
      [309469251917201367299197323800n, 98],
    ].forEach(([r, expectedbLen]) => {
      expect(subject.bitLength(r), `bitLength(${r}) expected ${expectedbLen}`).toBe(expectedbLen);
    });
  });

  // Stress tests
  test('handles large input', () => {
    expect(subject.bitLength(subject.factorial(1<<16))).toBe(954037);
  });

  test('stress with large random bigints', () => {
    const upperBound = subject.factorial(100);
    const numTests = 100;
    for (let i = 0; i < numTests; i++) {
      const bn = subject.randomBigInt(upperBound);
      const bits = subject.bitLength(bn);
      const expectedBits = bn.toString(2).length;
      expect(bits, `bitLength(${bn}) expected ${expectedBits}`).toBe(expectedBits);
    }
  });
});

describe('bitCombo', () => {
  test('performs as expected', () => {
    const N = 10;

    // Generate all combos N choose K and verify that they match the expected
    // values from the pre-generated combos test fixture.
    for (let n = 1; n < N; n++) {
      for (let k = 0; k < n; k++) {
        const nck = subject.nChooseK(n, k);
        for (let r = 0n; r < nck; r++) {
          const actual = subject.bitCombo(n, k, r).toString(2);
          let expected = 0n;
          for (let i of combos[n][k][r]) {
            const _i = Number(i);
            expected |= (1n << BigInt(n - _i - 1));
          }
          expect(actual).toBe(expected.toString(2));
        }
      }
    }
  });
});

describe('bitComboToR', () => {
  test('converts as expected', () => {
    const N = 8;
    const K = 5;
    [
      248n, 244n, 242n, 241n, 236n, 234n, 233n,
      230n, 229n, 227n, 220n, 218n, 217n, 214n,
      213n, 211n, 206n, 205n, 203n, 199n, 188n,
      186n, 185n, 182n, 181n, 179n, 174n, 173n,
      171n, 167n, 158n, 157n, 155n, 151n, 143n,
      124n, 122n, 121n, 118n, 117n, 115n, 110n,
      109n, 107n, 103n,  94n,  93n,  91n,  87n,
       79n,  62n,  61n,  59n,  55n,  47n,  31n
    ].forEach((bc, i) => {
      const r = subject.bitComboToR(N, K, bc);
      const expected = BigInt(i);
      expect(r, `bitComboToR(${N}, ${K}, ${bc}n) expected ${expected}`).toBe(expected);
    });
  });
});

describe('randomBigInt', () => {
  test('will not generate random above limit', () => {
    const NUM_TESTS = 1000;
    const UPPERBOUND = 257n;
    for (let n = 0; n < NUM_TESTS; n++) {
      const bigRand = subject.randomBigInt(UPPERBOUND);
      expect(bigRand < UPPERBOUND, `randomBigInt(${UPPERBOUND}) expected ${bigRand} < ${UPPERBOUND}`).toBe(true);
    }
  });
});
