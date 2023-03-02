import AudioAnalyser from "../Analyser";
import styles from "../App.module.css";

export const Television = ({
  mode,
  input,
  currentVisualiser,
  background,
  audioContext,
  fullscreen,
  setFullscreen,
}) => (
  <div className={styles.Television__Container} id="tv-container">
    <AudioAnalyser
      input={input}
      mode={mode}
      currentVisualiser={currentVisualiser}
      background={background}
      audioContext={audioContext}
      fullscreen={fullscreen}
      setFullscreen={setFullscreen}
    />
    <svg
      viewBox="0 0 1399 973"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.Television}
    >
      <path d="M1385 189H1147V266.767H1385V189Z" fill="#82888A" />
      <path
        d="M1147 277V266.767M1147 266.767V189H1385V266.767H1147Z"
        stroke="black"
      />
      <g filter="url(#filter0_f_0_1)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1385.5 53.8669H1146.64L1146.93 878.117H1386L1385.71 905.789L1375.45 912.974L43.6354 914H13.5184C13.5184 914 7.33378 50.7923 9.43582 35.3962C11.5379 20 37.5006 14.8727 37.5006 14.8727L1378.53 20L1385.5 30.2594V53.8669ZM104.154 217.073C100.033 130.486 108.129 110.771 206.323 111.502C481.31 88.3019 641.31 82.8134 951.736 105.352C1028.84 104.213 1056.98 119.977 1055.99 203.748C1080.11 441.257 1073.58 553.495 1047.65 738.777C1042.54 794.785 1025.56 812.851 967.374 818.724C666.86 847.869 492.441 848.976 168.791 818.724C121.309 801.286 110.761 784.69 106.239 749.027C104.678 721.465 103.096 695.462 101.583 670.585C91.8975 511.335 85.0148 398.172 104.154 217.073Z"
          fill="#383839"
        />
        <path
          d="M1146.64 53.8669V53.3669H1146.14L1146.14 53.867L1146.64 53.8669ZM1385.5 53.8669V54.3669H1386V53.8669H1385.5ZM1146.93 878.117L1146.43 878.117L1146.43 878.617H1146.93V878.117ZM1386 878.117L1386.5 878.122L1386.51 877.617H1386V878.117ZM1385.71 905.789L1386 906.198L1386.21 906.051L1386.21 905.794L1385.71 905.789ZM1375.45 912.974L1375.45 913.474L1375.61 913.474L1375.73 913.383L1375.45 912.974ZM43.6354 914L43.6354 914.5L43.6358 914.5L43.6354 914ZM13.5184 914L13.0185 914.004L13.022 914.5H13.5184V914ZM9.43582 35.3962L9.93123 35.4638L9.43582 35.3962ZM37.5006 14.8727L37.5026 14.3727L37.4527 14.3725L37.4038 14.3822L37.5006 14.8727ZM1378.53 20L1378.94 19.7189L1378.79 19.501L1378.53 19.5L1378.53 20ZM1385.5 30.2594H1386V30.1055L1385.91 29.9783L1385.5 30.2594ZM206.323 111.502L206.319 112.002L206.342 112.002L206.365 112L206.323 111.502ZM104.154 217.073L104.651 217.125L104.655 217.087L104.654 217.049L104.154 217.073ZM951.736 105.352L951.7 105.851L951.722 105.852L951.743 105.852L951.736 105.352ZM1055.99 203.748L1055.49 203.742L1055.49 203.771L1055.49 203.799L1055.99 203.748ZM1047.65 738.777L1047.15 738.708L1047.15 738.72L1047.15 738.732L1047.65 738.777ZM967.374 818.724L967.422 819.222L967.424 819.222L967.374 818.724ZM168.791 818.724L168.619 819.193L168.68 819.216L168.745 819.222L168.791 818.724ZM106.239 749.027L105.74 749.055L105.741 749.073L105.743 749.09L106.239 749.027ZM101.583 670.585L102.082 670.554L102.082 670.554L101.583 670.585ZM1146.64 54.3669H1385.5V53.3669H1146.64V54.3669ZM1147.43 878.117L1147.14 53.8667L1146.14 53.867L1146.43 878.117L1147.43 878.117ZM1386 877.617H1146.93V878.617H1386V877.617ZM1386.21 905.794L1386.5 878.122L1385.5 878.112L1385.21 905.783L1386.21 905.794ZM1375.73 913.383L1386 906.198L1385.42 905.379L1375.16 912.564L1375.73 913.383ZM43.6358 914.5L1375.45 913.474L1375.45 912.474L43.635 913.5L43.6358 914.5ZM13.5184 914.5H43.6354V913.5H13.5184V914.5ZM8.94042 35.3285C8.87003 35.8441 8.81238 37.1868 8.76274 39.2592C8.71271 41.3475 8.67039 44.2107 8.63529 47.7956C8.5651 54.9658 8.52376 65.0296 8.50773 77.5684C8.47567 102.646 8.54483 137.629 8.68694 179.175C8.97115 262.266 9.54717 371.611 10.1889 480.475C10.8306 589.338 11.538 697.72 12.0849 778.887C12.3584 819.47 12.5918 853.249 12.7568 876.882C12.8393 888.699 12.9047 897.979 12.9495 904.306C12.9719 907.469 12.9891 909.893 13.0008 911.527C13.0066 912.344 13.011 912.963 13.014 913.378C13.0155 913.585 13.0166 913.742 13.0173 913.846C13.0177 913.899 13.018 913.938 13.0182 913.964C13.0183 913.977 13.0183 913.987 13.0184 913.994C13.0184 914 13.0185 914.004 13.5184 914C14.0184 913.996 14.0184 913.993 14.0184 913.987C14.0183 913.98 14.0182 913.97 14.0181 913.957C14.018 913.931 14.0177 913.891 14.0173 913.839C14.0166 913.735 14.0154 913.578 14.014 913.371C14.011 912.956 14.0066 912.337 14.0008 911.52C13.9891 909.886 13.9719 907.462 13.9495 904.298C13.9047 897.972 13.8393 888.692 13.7568 876.875C13.5918 853.242 13.3584 819.463 13.0849 778.88C12.538 697.714 11.8306 589.332 11.1889 480.469C10.5472 371.606 9.97114 262.262 9.68693 179.172C9.54483 137.626 9.47567 102.645 9.50773 77.5697C9.52376 65.0317 9.56509 54.9713 9.63524 47.8054C9.67032 44.2222 9.71259 41.3644 9.76245 39.2831C9.81269 37.1859 9.87024 35.9105 9.93123 35.4638L8.94042 35.3285ZM37.5006 14.8727C37.4038 14.3822 37.4035 14.3822 37.4032 14.3823C37.403 14.3823 37.4025 14.3824 37.4021 14.3825C37.4011 14.3827 37.3997 14.383 37.398 14.3833C37.3945 14.384 37.3894 14.385 37.3828 14.3864C37.3696 14.389 37.3502 14.393 37.3249 14.3982C37.2742 14.4087 37.1996 14.4244 37.1027 14.4454C36.9088 14.4874 36.6255 14.5507 36.265 14.6367C35.5439 14.8087 34.5133 15.0712 33.2708 15.4345C30.7872 16.1606 27.4497 17.2913 24.0421 18.9092C17.2697 22.1245 10.0288 27.3565 8.94042 35.3285L9.93123 35.4638C10.9448 28.0397 17.7364 23.0099 24.4709 19.8125C27.8168 18.224 31.1013 17.1107 33.5514 16.3943C34.7758 16.0363 35.79 15.778 36.4969 15.6094C36.8504 15.5251 37.1269 15.4633 37.3144 15.4227C37.4082 15.4024 37.4797 15.3874 37.5274 15.3775C37.5512 15.3726 37.5691 15.3689 37.5809 15.3666C37.5867 15.3654 37.5911 15.3645 37.5939 15.3639C37.5953 15.3637 37.5963 15.3635 37.5969 15.3633C37.5972 15.3633 37.5973 15.3632 37.5975 15.3632C37.5976 15.3632 37.5975 15.3632 37.5006 14.8727ZM1378.53 19.5L37.5026 14.3727L37.4987 15.3727L1378.52 20.5L1378.53 19.5ZM1385.91 29.9783L1378.94 19.7189L1378.11 20.2811L1385.09 30.5405L1385.91 29.9783ZM1386 53.8669V30.2594H1385V53.8669H1386ZM206.326 111.002C181.769 110.819 162.808 111.914 148.25 115.024C133.686 118.135 123.483 123.274 116.495 131.213C109.51 139.149 105.794 149.822 104.075 163.885C102.355 177.945 102.624 195.45 103.655 217.097L104.654 217.049C103.623 195.402 103.359 177.973 105.067 164.006C106.775 150.043 110.448 139.598 117.246 131.874C124.041 124.152 134.016 119.087 148.458 116.002C162.907 112.915 181.78 111.819 206.319 112.002L206.326 111.002ZM951.772 104.853C641.315 82.3125 481.289 87.8018 206.281 111.004L206.365 112C481.331 88.8019 641.304 83.3144 951.7 105.851L951.772 104.853ZM1056.49 203.754C1056.99 161.849 1050.21 136.757 1033.48 122.33C1016.77 107.923 990.27 104.283 951.729 104.852L951.743 105.852C990.306 105.283 1016.43 108.955 1032.82 123.088C1049.19 137.201 1055.99 161.876 1055.49 203.742L1056.49 203.754ZM1048.14 738.847C1074.08 553.527 1080.61 441.249 1056.49 203.698L1055.49 203.799C1079.61 441.265 1073.08 553.463 1047.15 738.708L1048.14 738.847ZM967.424 819.222C996.54 816.283 1015.48 810.285 1027.77 797.904C1040.06 785.521 1045.59 766.849 1048.15 738.823L1047.15 738.732C1044.6 766.714 1039.09 785.078 1027.06 797.199C1015.03 809.321 996.393 815.293 967.324 818.227L967.424 819.222ZM168.745 819.222C492.425 849.477 666.876 848.37 967.422 819.222L967.326 818.226C666.844 847.368 492.456 848.475 168.838 818.226L168.745 819.222ZM105.743 749.09C108.008 766.953 111.792 780.135 121.024 791.033C130.246 801.92 144.854 810.465 168.619 819.193L168.964 818.255C145.247 809.544 130.839 801.073 121.787 790.387C112.743 779.711 108.992 766.763 106.735 748.964L105.743 749.09ZM101.084 670.615C102.597 695.493 104.179 721.494 105.74 749.055L106.738 748.999C105.177 721.435 103.595 695.432 102.082 670.554L101.084 670.615ZM103.657 217.02C84.513 398.163 91.3982 511.362 101.084 670.615L102.082 670.554C92.3969 511.309 85.5167 398.18 104.651 217.125L103.657 217.02Z"
          fill="black"
        />
      </g>
      <path d="M1148 674H1385" stroke="black" />
      <path
        d="M18.1266 8.13193L15 9.15211V10.1723L22.0834 20.3742C546.564 14.9935 843.809 15.3305 1378.2 20.3742C1382.17 21.7179 1382.95 24.7029 1384.45 27.4751L1385.49 54L1391.75 28.5357H1398C1395.41 17.3918 1389.68 12.7613 1369.86 8.13193C833.193 -1.26885 537.023 -1.48516 18.1266 8.13193Z"
        fill="#E1EBF0"
        stroke="black"
      />
      <path d="M1148 401H1384" stroke="black" />
      <path
        d="M1147 376V379H1385V375H1147M1147 383H1385V392H1147V383Z"
        stroke="black"
      />
      <path d="M1145 793H1386.96H1388V373H1147.67H1145V793Z" fill="#82888A" />
      <path
        d="M1149.75 592.265H1384.88M1386.96 793H1145V373H1147.67H1388V793H1386.96Z"
        stroke="black"
      />
      <path d="M1385 605H1148" stroke="black" />
      <path d="M1385 762H1148V771H1385V762Z" stroke="black" />
      <path
        d="M1383.71 648H1148V643H1383.71C1387.86 643 1385.44 646.333 1383.71 648Z"
        stroke="black"
      />
      <path d="M1147 784V789H1386V784H1147Z" stroke="black" />
      <path d="M1148 649V652H1385V649H1148Z" stroke="black" />
      <path d="M1148 652V656L1385 655V652H1148Z" stroke="black" />
      <path d="M1147 656V664H1385V656H1147Z" stroke="black" />
      <path d="M1148 661H1384" stroke="black" />
      <path d="M1148 642V634L1385 635V642H1148Z" stroke="black" />
      <path d="M1148 584V580H1385V584H1148Z" stroke="black" />
      <path d="M1385 589H1148V595H1385V589Z" stroke="black" />
      <path d="M1148 608V601H1385V608H1148Z" stroke="black" />
      <path d="M1385 614H1148V622H1385V614Z" stroke="black" />
      <path d="M1385 626H1148V634H1385V626Z" stroke="black" />
      <path d="M1148 639H1385" stroke="black" />
      <path d="M1148 468H1384" stroke="black" />
      <path d="M1385 483H1148V480H1385V483Z" stroke="black" />
      <path d="M1148 771V779H1386V771H1148Z" stroke="black" />
      <path d="M1147 404V396V395H1385V404H1147Z" stroke="black" />
      <path d="M1385 407H1148V413H1385V407Z" stroke="black" />
      <path d="M1143 793V878L1386 876.988V793H1143Z" fill="#A3A3A3" />
      <path
        d="M1143 136V51L1384 52.0241V136H1143Z"
        fill="#0A0A0A"
        stroke="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1143 792H1388V877.98L1143 879V792ZM1145.09 794.023V876.968L1385.91 875.965V794.023H1145.09Z"
        fill="#A3A3A3"
      />
      <g filter="url(#filter1_f_0_1)">
        <path
          d="M1148.12 873.362V793H1145V877H1381V873.362H1148.12Z"
          fill="#434343"
        />
        <path
          d="M1148.12 873.362V793H1145V877H1381V873.362H1148.12Z"
          stroke="#434343"
        />
      </g>
      <path d="M1147 375V277H1385V375H1147Z" fill="#82888A" stroke="black" />
      <path
        d="M885 64L1038.72 94.9333L1053.26 153.707L1100 296V90.8089C1095.5 74.1698 1088.68 69.4543 1069.88 68.1244L885 64Z"
        fill="#2F3032"
        stroke="black"
      />
      <path d="M1147 276H1385V273H1147V276Z" fill="#121212" stroke="black" />
      <path d="M1385 268H1148V272H1385V268Z" fill="#262626" stroke="black" />
      <path d="M1385 136H1146.13H1143V51H1385V136Z" stroke="black" />
      <path d="M1143 51H1384.86L1388 878H1143V51Z" stroke="black" />
      <path
        d="M37 78.3478C45.0821 79.3265 48.4946 83.2597 53.6957 92.9565C55.2012 71.6046 65.71 67.9152 93.3478 68.9565L186.217 94C310.218 76.1317 386.834 62.1697 517 46H43.2609L37 78.3478Z"
        fill="#24252B"
        stroke="#3D4044"
      />
      <g filter="url(#filter2_f_0_1)">
        <path
          d="M1100.38 96.2877L1080.6 218.548L1116 348V49.0274L787 48C824.157 54.91 947.292 73.954 961.911 77.7945L1070.19 68.5479C1094.44 70.2323 1100.34 79.0391 1100.38 96.2877Z"
          fill="#24252B"
        />
        <path
          d="M1100.38 96.2877L1080.6 218.548L1116 348V49.0274L787 48C824.157 54.91 947.292 73.954 961.911 77.7945L1070.19 68.5479C1094.44 70.2323 1100.34 79.0391 1100.38 96.2877Z"
          stroke="#24252B"
        />
      </g>
      <path d="M1148 414V417H1385V414H1148Z" stroke="black" />
      <path d="M1385 420H1148V426H1385V420Z" stroke="black" />
      <path d="M1148 427V430H1385V427H1148Z" stroke="black" />
      <path d="M1148 431V435H1385V431H1148Z" stroke="black" />
      <path d="M1148 436V438H1385V436H1148Z" stroke="black" />
      <path d="M1148 442V439H1385V442H1148Z" stroke="black" />
      <path d="M1148 443V446.387L1385 447V443H1148Z" stroke="black" />
      <path d="M1148 448V451H1384V448H1148Z" stroke="black" />
      <path d="M1148 454.25V452M1148 452H1385V455H1148V452Z" stroke="black" />
      <path d="M1148 456V460H1385V456H1148Z" stroke="black" />
      <path d="M1148 461V464H1385V461H1148Z" stroke="black" />
      <path d="M1148 468V465M1148 465H1385V468V472H1148V465Z" stroke="black" />
      <path d="M1148 486V477.111L1385 476V486H1148Z" stroke="black" />
      <g filter="url(#filter3_f_0_1)">
        <path
          d="M1116 349.215L1054.73 153L1067.19 398.525C1066.65 563.382 1064.44 647.066 1042.27 780.682C1032.7 792.783 1024.81 800.584 1008 815.61C1012.27 817.877 1021.22 810.987 1055.77 775.545C1083.56 649.138 1098.41 577.189 1116 435.508V349.215Z"
          fill="#0B0B0B"
        />
        <path
          d="M1116 349.215L1054.73 153L1067.19 398.525C1066.65 563.382 1064.44 647.066 1042.27 780.682C1032.7 792.783 1024.81 800.584 1008 815.61C1012.27 817.877 1021.22 810.987 1055.77 775.545C1083.56 649.138 1098.41 577.189 1116 435.508V349.215Z"
          stroke="#0B0B0B"
        />
      </g>
      <path d="M1385 668H1148V677H1385V668Z" stroke="black" />
      <path d="M1148 690V681H1385V690H1148Z" stroke="black" />
      <path d="M1385 695H1148V703H1385V695Z" stroke="black" />
      <path d="M1148 704V711H1385V704H1148Z" stroke="black" />
      <path d="M1148 712V721H1385V712H1148Z" stroke="black" />
      <path d="M1147 725V732H1385V725H1147Z" stroke="black" />
      <path d="M1147 737V746L1385 745V737H1147Z" stroke="black" />
      <path d="M1147 750V759H1385V750H1147Z" stroke="black" />
      <path
        d="M37 77C44.1867 78.3278 47.859 81.4217 53.7197 91.3974C54.593 112.243 73.171 154.755 93.4291 208.634C77.8188 306.32 74.765 362.245 72.5294 462.645C70.9346 573.713 75.0858 635.616 90.2941 745.452L99.699 783.502L56.8547 842.12C56.6918 855.544 60.0697 859.872 72.5294 861.659L339 874H37V77Z"
        fill="#3D4044"
        stroke="#3D4044"
      />
      <path d="M1385 188H1145V179H1385V188Z" fill="#262626" stroke="black" />
      <path
        d="M70 863.412L153.478 827.412C278.339 855.013 363.035 864.226 552.087 864.471C662.83 863.529 723.97 862.221 824.435 852.824C897.728 841.235 937.225 833.916 1006 820L783.739 865.529L1006 866.588L857.826 874H362.174L70 863.412Z"
        fill="url(#paint0_linear_0_1)"
        stroke="#3F3F3F"
      />
      <path
        d="M1380 61H1152V127.957L1380 131V61Z"
        fill="#161515"
        stroke="black"
      />
      <path
        d="M1116 874V586.787V436C1098.77 575.112 1084.62 648.795 1055.58 776.553C1074.58 795.301 1082.27 809.176 1094.12 836.047C1095.49 858.709 1088.66 863.874 1069.12 865.794L1027.46 866.82L791 874H1116Z"
        fill="#2F3032"
        stroke="#2F3032"
      />
      <g filter="url(#filter4_f_0_1)">
        <path
          d="M1055.18 776C1048.66 784.003 1042.72 789.948 1030 801.909C1052.4 810.183 1066.78 817.544 1094 833L1093.83 832.663C1079.09 803.344 1070.78 786.801 1055.18 776Z"
          fill="#474A58"
        />
        <path
          d="M1055.18 776C1048.66 784.003 1042.72 789.948 1030 801.909C1052.4 810.183 1066.78 817.544 1094 833L1093.83 832.663C1079.09 803.344 1070.78 786.801 1055.18 776Z"
          stroke="#303340"
        />
      </g>
      <path
        d="M58 842.117L99.3044 785C118.058 810.701 129.675 820.597 153 827.578L76.587 860.81C63.1205 861.927 58.6222 858.417 58 842.117Z"
        fill="url(#paint1_linear_0_1)"
        stroke="url(#paint2_linear_0_1)"
      />
      <path
        d="M1004.74 821.295C947.305 837.659 885.047 847.559 783 865H1066.16C1091.2 863.158 1096.22 855.6 1093.23 833.492L1028.68 803C1021.41 810.636 1015.95 814.591 1004.74 821.295Z"
        fill="#BAB9C2"
        stroke="#BAB9C2"
      />
      <g filter="url(#filter5_f_0_1)">
        <path
          d="M1084.43 862C1050.76 838.49 1035.07 828.28 1015 817.464L1030.54 804C1056 813.712 1069.72 820.891 1093.75 835.071C1094.72 853.636 1093.09 860.245 1084.43 862Z"
          fill="#A7AAB6"
        />
        <path
          d="M1084.43 862C1050.76 838.49 1035.07 828.28 1015 817.464L1030.54 804C1056 813.712 1069.72 820.891 1093.75 835.071C1094.72 853.636 1093.09 860.245 1084.43 862Z"
          stroke="#54596C"
        />
      </g>
      <path
        d="M57.4327 108.869L94.7377 213C95.4731 187.773 97.1707 167.115 101.991 150.447C111.775 116.619 134.423 99.222 188 93.4034L94.7377 68.6593C60.1855 65.2792 52.2834 74.3367 57.4327 108.869Z"
        fill="#151212"
        stroke="black"
      />
      <path d="M1146 136V180H1385V136H1146Z" fill="#18191A" stroke="black" />
      <path
        d="M1398 28.9971C1393.76 14.2232 1386.86 9.78504 1366.73 8.2807C848.839 0.62133 555.014 -0.779237 17.1265 8.2807L14 9.31652L23.3795 20.7105C544.947 15.684 840.754 15.2578 1377.16 20.7105C1382.9 21.841 1384.04 23.178 1384.45 27.9613L1385.49 58L1391.75 28.9971"
        stroke="black"
      />
      <path d="M1148 489V494H1385V489H1148Z" stroke="black" />
      <path d="M1148 495V498H1385V495H1148Z" stroke="black" />
      <path d="M1148 498V502H1385V498H1148Z" stroke="black" />
      <path d="M1385 506H1148V511H1385V506Z" stroke="black" />
      <path d="M1148 512V515H1385V512H1148Z" stroke="black" />
      <path d="M1385 520H1148V517H1385V520Z" stroke="black" />
      <path d="M1148 523V521H1385V523H1148Z" stroke="black" />
      <path d="M1148 524V527H1385V524H1148Z" stroke="black" />
      <path d="M1385 532H1148V527H1385V532Z" stroke="black" />
      <path d="M1148 537V533H1385V537H1148Z" stroke="black" />
      <path d="M1148 537V541H1385V537H1148Z" stroke="black" />
      <path d="M1148 542V545H1385V542H1148Z" stroke="black" />
      <path d="M1148 546V549H1385V546H1148Z" stroke="black" />
      <path d="M1148 549V554H1385V549H1148Z" stroke="black" />
      <path d="M1148 555V557H1385V555H1148Z" stroke="black" />
      <path d="M1148 558V561H1385V558H1148Z" stroke="black" />
      <path d="M1148 562V567H1385V562H1148Z" stroke="black" />
      <path d="M1148 568V571H1385V568H1148Z" stroke="black" />
      <path d="M1148 571V574H1385V571H1148Z" stroke="black" />
      <path d="M1148 574V579H1385V574H1148Z" stroke="black" />
      <path d="M1148 742H1385" stroke="black" />
      <path d="M1148 755H1386" stroke="black" />
      <path d="M1150 687H1385" stroke="black" />
      <path d="M1148 400H1385" stroke="black" />
      <path d="M1385 674H1148" stroke="black" />
      <path d="M1146.09 179H1386V136L1144 137" stroke="black" />
      <path
        d="M58 86.1892L101.076 147C107.834 127.433 115.278 117.621 141 104.432L71.6582 72C58.8854 72.1498 58.091 76.8269 58 86.1892Z"
        fill="#C5C5C5"
        stroke="#3B3838"
      />
      <path
        d="M184 93.6417C166.164 93.7634 156.431 96.1423 139.491 104L72.2105 71.8891C71.0116 71.1114 69.507 70.928 66 70.8533C75.5705 67.6287 81.2966 67.4463 91.8772 68.7816L184 93.6417Z"
        fill="#2E2E2E"
        stroke="#2E2E2E"
      />
      <g filter="url(#filter6_f_0_1)">
        <path
          d="M1043 96.2025C1032.23 101.271 1022.05 103.181 1003.37 106.47C797.255 90.3202 693.219 86.0598 533.013 89.0154C352.615 92.0727 277.382 101.118 137.747 115.71C121.978 119.266 116.218 127.543 107.502 145.485C96.394 270.835 92.3152 341.334 92.9013 467.876C90.9 590.636 96.6942 656.163 107.502 772.812C116.554 793.576 126.244 803.465 154.433 816.961C301.651 835.05 394.64 841.008 577.858 844.683C746.19 842.494 840.484 835.439 1008.58 816.961C895.919 848.604 814.445 863.735 577.858 863.164C400.013 866.471 305.545 861.045 154.433 827.228C129.427 818.695 117.147 810.136 100.202 784.106C90.4223 768.471 84.2873 745.333 71 467.876C75.1525 356.369 80.1799 298.851 94.9871 207.088C95.3067 186.158 96.5858 172.809 101.245 145.485C110.505 125.04 117.204 118.084 130.446 109.55C145.489 100.62 158.704 97.22 188.85 93.1223C308.698 74.8244 380.234 65.2489 519.455 50H801.043L1043 96.2025Z"
          fill="#0B0B0B"
        />
        <path
          d="M1043 96.2025C1032.23 101.271 1022.05 103.181 1003.37 106.47C797.255 90.3202 693.219 86.0598 533.013 89.0154C352.615 92.0727 277.382 101.118 137.747 115.71C121.978 119.266 116.218 127.543 107.502 145.485C96.394 270.835 92.3152 341.334 92.9013 467.876C90.9 590.636 96.6942 656.163 107.502 772.812C116.554 793.576 126.244 803.465 154.433 816.961C301.651 835.05 394.64 841.008 577.858 844.683C746.19 842.494 840.484 835.439 1008.58 816.961C895.919 848.604 814.445 863.735 577.858 863.164C400.013 866.471 305.545 861.045 154.433 827.228C129.427 818.695 117.147 810.136 100.202 784.106C90.4223 768.471 84.2873 745.333 71 467.876C75.1525 356.369 80.1799 298.851 94.9871 207.088C95.3067 186.158 96.5858 172.809 101.245 145.485C110.505 125.04 117.204 118.084 130.446 109.55C145.489 100.62 158.704 97.22 188.85 93.1223C308.698 74.8244 380.234 65.2489 519.455 50H801.043L1043 96.2025Z"
          stroke="#0B0B0B"
        />
      </g>
      <path
        d="M1069.26 69C1078.77 69.4355 1082.7 70.005 1085 72.12C1071.78 71.3017 1065.85 73.6619 1057.72 82.52C1047.66 91.019 1042.65 93.6194 1034.64 95L957 77.32L1069.26 69Z"
        fill="#232323"
        stroke="#232323"
      />
      <g filter="url(#filter7_f_0_1)">
        <path
          d="M1090.66 90.0221L1055.16 154C1039.05 125.338 1028.81 112.422 1004 106.533C1020.06 102.701 1028.64 100.357 1039.5 94.1498C1053.52 87.4512 1058.75 83.2096 1067.69 75.5755C1091.16 69.9948 1096.89 72.9066 1090.66 90.0221Z"
          fill="url(#paint3_linear_0_1)"
        />
        <path
          d="M1090.66 90.0221L1055.16 154C1039.05 125.338 1028.81 112.422 1004 106.533C1020.06 102.701 1028.64 100.357 1039.5 94.1498C1053.52 87.4512 1058.75 83.2096 1067.69 75.5755C1091.16 69.9948 1096.89 72.9066 1090.66 90.0221Z"
          stroke="#71726C"
        />
      </g>
      <path
        d="M14.5429 10C14.5429 10 24.9605 20.7687 21.8352 22.307C18.7099 23.8454 13.5961 23.979 13.5011 31.5373V902.26C13.5011 902.26 17.6682 910.465 26.0022 910.465C34.3363 910.465 1374.04 909.439 1374.04 909.439C1382.51 908.385 1383.83 906.718 1385.5 900.209V59.2281L1391.75 29H1398V909.439C1392.87 921.067 1386.02 925.666 1367.79 930.977H1324.04L1304.24 972H88.5078L71.8397 927.9H17.6682C7.37272 925.856 3.83435 921.901 1 910.465L2.04176 27.435C4.29152 18.5679 5.91662 14.5485 14.5429 10Z"
        fill="#222121"
        stroke="#222121"
      />
      <defs>
        <filter
          id="filter0_f_0_1"
          x="4.5"
          y="10.3725"
          width="1386.01"
          height="908.128"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_0_1"
          />
        </filter>
        <filter
          id="filter1_f_0_1"
          x="1140.5"
          y="788.5"
          width="245"
          height="93"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_0_1"
          />
        </filter>
        <filter
          id="filter2_f_0_1"
          x="782.909"
          y="43.5"
          width="337.591"
          height="308.632"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_0_1"
          />
        </filter>
        <filter
          id="filter3_f_0_1"
          x="1003.13"
          y="148.851"
          width="117.368"
          height="671.649"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_0_1"
          />
        </filter>
        <filter
          id="filter4_f_0_1"
          x="1025.07"
          y="771.326"
          width="74.1185"
          height="66.9236"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_0_1"
          />
        </filter>
        <filter
          id="filter5_f_0_1"
          x="1010.12"
          y="799.426"
          width="88.3752"
          height="67.1064"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_0_1"
          />
        </filter>
        <filter
          id="filter6_f_0_1"
          x="66.4996"
          y="45.5"
          width="982.105"
          height="823"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_0_1"
          />
        </filter>
        <filter
          id="filter7_f_0_1"
          x="999.884"
          y="68.4999"
          width="97.616"
          height="90.5254"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_0_1"
          />
        </filter>
        <linearGradient
          id="paint0_linear_0_1"
          x1="538"
          y1="820"
          x2="538"
          y2="874"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.716149" stopColor="#E1EBF0" />
          <stop offset="1" stopColor="#777777" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_0_1"
          x1="105.5"
          y1="785"
          x2="105.5"
          y2="861"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.569444" stopColor="#969A9D" />
          <stop offset="1" stopColor="#C5C5C5" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_0_1"
          x1="105.5"
          y1="785"
          x2="105.5"
          y2="861"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0121527" stopColor="#424242" />
          <stop offset="1" stopColor="#424242" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_0_1"
          x1="1048.5"
          y1="73"
          x2="1048.5"
          y2="154"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.778861" stopColor="#93958B" />
          <stop offset="1" stopColor="#93958B" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);