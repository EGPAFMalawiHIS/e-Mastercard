<template>
  <table>
    
    <tr class="section-description">
      <td class="numbers">&nbsp;</td>
      <td style="font-weight: bold;" colspan="2">ART Clinic</td>
      <td colspan="3" style="text-align: center; font-weight: bold;">Newly registered in quarter</td>
      <td class="vertical-separator">&nbsp;</td>
      <td colspan="3" style="text-align: center; font-weight: bold;">Cumulative ever registered</td>
    </tr>

    <tr class="section-description">
      <td class="numbers">&nbsp;</td>
      <td style="font-weight: bold;" colspan="2">Patients registration details</td>
      <td style="font-weight: normal; text-align:center;">E-Mastercard</td>
      <td style="font-weight: normal; text-align:center;">Clinic own*</td>
      <td style="font-weight: normal; text-align:center;">Checked data</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal; text-align:center;">E-Mastercard</td>
      <td style="font-weight: normal; text-align:center;">Clinic own*</td>
      <td style="font-weight: normal; text-align:center;">Checked data</td>
    </tr>

    <tr>
      <td class="numbers">25.</td>
      <td style="font-weight: normal;text-align:left;padding-left:5px;" colspan="2">Total registered</td>
      <td style="font-weight: normal;">{{newly_registered_quarterly}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{newly_registered_cum}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td colspan="10">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">26.</td>
      <td style="font-weight: normal; border-right-style: none !important; border-bottom-style: none !important;
        padding-left: 10px; text-align:left; padding-left:5px;">
        <b>FT</b>&nbsp;&nbsp;Patients initiated
      </td>
      <td style="font-weight: normal; border-left-style: none !important; 
        text-align:left; border-bottom-style: none !important;">Male</td>
      <td style="font-weight: normal;">{{males_initiated_on_art_first_time}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_males_initiated_on_art_first_time}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">27.</td>
      <td style="font-weight: normal; border-right-style: none !important; padding-left: 10px; text-align: left;
         border-top-style: none !important; border-bottom-style: none !important;width:100px;">on ART
      </td>
      <td style="font-weight: normal; border-left-style: none !important; text-align: left;
         border-top-style: none !important; border-bottom-style: none !important;">Female Non-pregnant</td>
      <td style="font-weight: normal;">{{initial_non_pregnant_females_all_ages}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_initial_non_pregnant_females_all_ages}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>
  
    <tr>
      <td class="numbers">28.</td>
      <td style="font-weight: normal; border-right-style: none !important; padding-left: 10px;
         border-top-style: none !important; border-bottom-style: none !important; text-align:left;">
        first time
      </td>
      <td style="font-weight: normal; border-left-style: none !important; text-align:left; 
         border-top-style: none !important; border-bottom-style: none !important;">Female pregnant</td>
      <td style="font-weight: normal;">{{initial_pregnant_females_all_ages}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_initial_pregnant_females_all_ages}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">29.</td>
      <td style="font-weight: normal; border-right-style: none !important; padding-left: 28px;
         border-top-style: none !important; border-bottom-style: none !important;">
        &nbsp;
      </td>
      <td style="font-weight: normal; border-left-style: none !important; text-align:left; 
         border-top-style: dotted !important; border-bottom-style: none !important">FT Init., Non-disagg.</td>
      <td style="font-weight: normal;">{{unknown_gender}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_unknown_gender}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">30.</td>
      <td style="font-weight: normal; border-right-style: none !important; padding-left: 28px;
         border-top-style: none !important;">
        &nbsp;
      </td>
      <td style="font-weight: normal; border-left-style: none !important; text-align:left; 
         border-top-style: dotted !important;">CHECK: Total FT</td>
      <td style="font-weight: normal;">{{initiated_on_art_first_time}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_initiated_on_art_first_time}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">31.</td>
      <td style="text-align: left;border-bottom-style: none;
        font-weight: normal;padding-left: 10px;" colspan="2"><b>Re</b>&nbsp;&nbsp;Patients re-initiated on ART</td>
      <td style="font-weight: normal;">{{re_initiated_on_art}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_re_initiated_on_art}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">32.</td>
      <td style="text-align: left;font-weight: normal;padding-left: 10px;" colspan="2">
        <b>TI</b>&nbsp;&nbsp;Patients transferred in on ART
      </td>
      <td style="font-weight: normal;">{{transfer_in}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_transfer_in}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td colspan="10">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">33.</td>
      <td style="text-align: left;font-weight: normal;padding-left: 10px;" colspan="2">
        <b>M</b>&nbsp;&nbsp;Males (all ages)
      </td>
      <td style="font-weight: normal;">{{quarterly_all_males}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cummulative_all_males}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">34.</td>
      <td style="text-align: left;border-top-style: none;font-weight: normal;padding-left: 10px;" colspan="2">
        <b>FNP</b>&nbsp;&nbsp;Non-pregnant Females (all ages)
      </td>
      <td style="font-weight: normal;">{{non_pregnant_females}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_non_pregnant_females}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">35.</td>
      <td style="text-align: left;border-top-style: none;font-weight: normal;padding-left: 10px;" colspan="2">
        <b>FP</b>&nbsp;&nbsp;Pregnant Females (all ages)
      </td>
      <td style="font-weight: normal;">{{pregnant_females_all_ages}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_pregnant_females_all_ages}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td colspan="10">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">36.</td>
      <td style="text-align: left;font-weight: normal;padding-left: 10px;" colspan="2">
        <b>A</b>&nbsp;&nbsp;Children below 24 m at ART initiation
      </td>
      <td style="font-weight: normal;">{{children_below_24_months_at_art_initiation}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_children_below_24_months_at_art_initiation}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">37.</td>
      <td style="text-align: left;border-top-style: none;font-weight: normal;padding-left: 10px;" colspan="2">
        <b>B</b>&nbsp;&nbsp;Children 24 m - 14 yrs at ART initiation
      </td>
      <td style="font-weight: normal;">{{children_24_months_14_years_at_art_initiation}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_children_24_months_14_years_at_art_initiation}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">38.</td>
      <td style="text-align: left;border-top-style: none;font-weight: normal;padding-left: 10px;" colspan="2">
        <b>C</b>&nbsp;&nbsp;Adults 15 years+ at ART initiation
      </td>
      <td style="font-weight: normal;">{{adults_at_art_initiation}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_adults_at_art_initiation}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td>&nbsp;</td>
      <td colspan="9" style="text-align: left;">Reason for starting ART</td>
    </tr>

    <tr>
      <td class="numbers">39.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-style: none !important; text-align: left;
        border-bottom-width:0px;"><b>PSHD</b></td>
      <td style="border-left-style: none; text-align: left; padding-left:10px;
        border-bottom-width:0px;">&nbsp;&nbsp;Pres. Sev. HIV disease age <12 m</td>
      <td style="font-weight: normal;">{{presumed_severe_hiv_disease_in_infants}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_presumed_severe_hiv_disease_in_infants}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">40.</td>

      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-width: 0px !important; border-bottom-style:none;
        border-left-width:1px; border-top-width:0px;">&nbsp;</td>
      <td style="border-left-width:1px !important; border-right-width:1px !important;
        border-bottom-width:0px !important; border-style: dotted; text-align: left; padding-left:10px;
        border-top-width:0px;"><b>PCR</b> Infants <12 mths PCR</td>


      <td style="border-top-width:0px; border-bottom-width:0px; font-weight: normal;">{{confirmed_hiv_infection_in_infants_pcr}}</td>
      <td style="border-top-width:0px; border-bottom-width:0px; font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_confirmed_hiv_infection_in_infants_pcr}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">41.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-style: none !important; 
        border-bottom-width:0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-left-width: 1px;
        border-top-width:0px; border-style:dotted; text-align: left; padding-left:10px;
        border-bottom-width:0px;"><b>U5</b> Children 12-59mths</td>
      <td style="font-weight: normal;">{{quarterly_children_12_59_months}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_children_12_59_months}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">42.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-width:1px !important; border-bottom-width:0px;
        border-top-width:0px; border-style: dotted;">&nbsp;</td>
      <td style="border-left-style: none;
        border-top-width:0px; text-align: left; padding-left:10px;
        border-bottom-width:0px;"><b>Preg</b> Pregnant women</td>
      <td style="font-weight: normal;">{{pregnant_women}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_pregnant_women}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">43.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-style: none !important; border-style: dotted;
        border-left-width:1px;
        border-top-width:0px; border-bottom-width:0px;">&nbsp;</td>
      <td style="border-left-style: none;
        border-top-width:0px; text-align: left; padding-left:10px;
        border-bottom-width:0px;"><b>BF</b> Breastfeeding mothers</td>
      <td style="font-weight: normal;">{{breastfeeding_mothers}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_breastfeeding_mothers}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">44.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-style: none !important; border-style: dotted;
        border-left-width:1px;
        border-top-width:0px; border-bottom-width:0px;">&nbsp;</td>
      <td style="border-left-style: none;
        border-top-width:0px; text-align: left; padding-left:10px;
        border-bottom-width:0px;"><b>CD4</b> CD4 below threshold</td>
      <td style="font-weight: normal;">{{who_stage_two}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_who_stage_two}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">45.</td>
      
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-style: none !important; border-style: dotted;
        border-left-width:1px;
        border-top-width:0px; border-bottom-width:0px;">&nbsp;</td>
      <td style="border-left-style: none;
        border-top-width:0px; text-align: left; padding-left:10px;
        border-bottom-width:0px;"><b>Asy</b> Asymptomatic / mild</td>
      <td style="font-weight: normal;">{{asymptomatic}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_asymptomatic}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>
    
    <tr>
      <td class="numbers">46.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-style: none !important;
        border-top-width:0px; text-align: left;
        border-bottom-width:0px;"><b>3</b></td>
      <td style="border-left-style: none;
        border-bottom-width:0px; text-align: left; padding-left:10px;
        border-top-width:0px;">WHO stage 3</td>
      <td style="font-weight: normal;">{{who_stage_three}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_who_stage_three}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">47.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-style: none !important;
        border-top-width:0px; text-align: left;
        border-bottom-width:0px;"><b>4</b></td>
      <td style="border-left-width:0px;
        border-bottom-style:none; text-align: left; padding-left:10px;
        border-top-width:0px;">WHO stage 4</td>
      <td style="font-weight: normal;">{{who_stage_four}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_who_stage_four}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">48.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-style: none !important; text-align: left;
        border-top-style:none;"><b>Unk</b></td>
      <td style="border-left-style: none; text-align: left; padding-left:10px;
        border-top-style:none;">Unknown / reason outside guidelines</td>
      <td style="font-weight: normal;">{{unknown_other_reason_outside_guidelines}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_unknown_other_reason_outside_guidelines}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td>&nbsp;</td>
      <td colspan="9" style="text-align: left;">Stage defining conditions at ART initiation</td>
    </tr>

    <tr>
      <td class="numbers">49.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px; text-align: left; padding-left:10px;
        border-right-style: none !important;"><b>Nev/>2yrs</b></td>
      <td style="border-left-style: none; text-align: left; padding-left:10px;">Never TB / TB over 2 years ago</td>
      <td style="font-weight: normal;">{{no_tb}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_no_tb}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">50.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px; text-align: left; padding-left:10px;
        border-right-style: none !important;"><b>Last 2yrs</b></td>
      <td style=" text-align: left; padding-left:10px;border-left-style: none;">TB within the last 2 years</td>
      <td style="font-weight: normal;">{{tb_within_the_last_two_years}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_tb_within_the_last_two_years}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">51.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px; text-align: left; padding-left:10px;
        border-right-style: none !important;"><b>Curr</b></td>
      <td style="border-left-style: none; text-align: left; padding-left:10px;">Current episode of TB</td>
      <td style="font-weight: normal;">{{current_episode_of_tb}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_current_episode_of_tb}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td colspan="10" style="text-align: left;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">52.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px; text-align: left; padding-left:10px;
        border-right-style: none !important;"><b>KS</b></td>
      <td style="border-left-style: none; text-align: left; padding-left:10px;">Kaposi’s Sarcoma</td>
      <td style="font-weight: normal;">{{kaposis_sarcoma}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;">{{cum_kaposis_sarcoma}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td colspan="6" style="text-align: left;"><b>Primary outcomes as of the end of the quarter evaluated</b></td>
      <td colspan="3" style="text-align: center;"><b>Out of all patients ever registered</b></td>
    </tr>

    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td colspan="6" style="text-align: left;">&nbsp;</td>
      <td style="text-align: center;">E-Mastercard</td>
      <td style="text-align: center;">Clinic own**</td>
      <td style="text-align: center;">Checked data</td>
    </tr>

    <tr>
      <td class="numbers">53.</td>
      <td style="text-align: left; padding-left: 10px;" colspan="6">Total alive and on ART</td>
      <td style="font-weight: normal;">{{total_alive_and_on_art}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td colspan="9" style="text-align: center;">&nbsp;</td>
    </tr>
    
    <tr>
      <td class="numbers">54.</td>
      <td style="font-weight: bold; text-align: right;border-right-style: none;
        border-bottom-style: none;border-left-style: none;" colspan="2">M1</td>
      <td style="text-align: left; padding-left: 10px;
        border-right-style: none;border-bottom-style: none; border-left-style: none;" 
        colspan="4">Died within the 1st month after ART initiation</td>
      <td style="font-weight: normal;">{{died_within_the_1st_month_of_art_initiation}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">55.</td>
      <td style="font-weight: bold; text-align:right; border-right-style: none;
        border-top-style: none;border-left-style: none;
        border-bottom-style: none;" colspan="2">M2</td>
      <td style="text-align: left; padding-left: 10px;border-top-style: none;
        border-right-style: none;border-bottom-style: none; border-left-style: none;" 
        colspan="4">Died within the 2nd month after ART initiation</td>
      <td style="font-weight: normal;">{{died_within_the_2nd_month_of_art_initiation}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">56.</td>
      <td style="font-weight: bold; text-align: right; border-right-style:none;
        border-bottom-style:none; border-left-style:none; border-top-style: none;" colspan="2">M3</td>
      <td style="text-align: left; padding-left:10px; border-top-style: none;
        border-right-style:none; border-bottom-style:none; border-left-style: none;" 
        colspan="4">Died within the 3rd month after ART initiation</td>
      <td style="font-weight: normal;">{{died_within_the_3rd_month_of_art_initiation}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">57.</td>
      <td style="font-weight: bold; text-align:right; border-right-style: none;
        border-left-style: none; border-top-style: none;" colspan="2">M4+</td>
      <td style="text-align: left; padding-left: 10px;
        border-right-style:none; border-left-style:none; border-top-style: none;" 
        colspan="4">Died after the end of the 3rd month after ART initiation</td>
      <td style="font-weight: normal;">{{died_after_the_3rd_month_of_art_initiation}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">58.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-style:none;" colspan="6">Died total</td>
      <td style="font-weight: normal;">{{died_total}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">59.</td>
      <td style="text-align: left; padding-left: 10px;
        border-top-style:none; border-bottom-style:none;" colspan="6">Defaulted (more than 2 months overdue after expected to have run out of ARVs)</td>
      <td style="font-weight: normal;">{{defaulted}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">60.</td>
      <td style="text-align: left; padding-left: 10px;
        border-top-style:none; border-bottom-style:none;" colspan="6">Stopped taking ARVs (clinician or patient own decision, last known alive)</td>
      <td style="font-weight: normal;">{{stopped_art}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">61.</td>
      <td style="text-align: left; padding-left: 10px;border-top-style:none;" colspan="6">Transferred Out</td>
      <td style="font-weight: normal;">{{transfered_out}}</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td>&nbsp;</td>
      <td colspan="6" style="font-style: italic; text-align: center;">Check completeness of ‘Clinic own data’</td>
      <td><img src="../assets/sum-arrow.png" class="sum-arrows"/></td>
      <td><img src="../assets/sum-arrow.png" class="sum-arrows"/></td>
    </tr>
    
    <tr class="horisonatl-separator">
      <td class="numbers">62.</td>
      <td colspan="2">&nbsp;</td>
      <td colspan="5" style="text-align: center; border-style:dotted;
       border-width:1px 1px 0px 1px; text-align: left; padding-left:10px;">Total adv. outcomes = Died total + Defaulted + Stopped + TO</td>
      <td style="border-style:solid; border-width:1px;"><span class="postfixes">A</span></td>
      <td style="border-style:solid; border-width:1px;"><span class="postfixes">B</span></td>
    </tr>
    
    <tr class="horisonatl-separator">
      <td class="numbers">63.</td>
      <td colspan="2">&nbsp;</td>
      <td colspan="5" style="text-align: center; border-style:dotted;
       border-width:0px 0px 1px 1px; text-align: left; padding-left:10px;">Calculate completeness %&nbsp;&nbsp;
       A / B x 100 (Use difference if greater than 100%)</td>
      <td style="border-style:dotted; border-bottom-width:1px;">&nbsp;</td>
      <td style="border-style:solid; border-width:1px;"><span style="left: 40px;" class="postfixes">%</span></td>
    </tr>
    
    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td colspan="7" style="text-align:left; font-weight: bold; padding-left: 10px;">Secondary outcomes of those alive on ART</td>
      <td><b>P</b>aeds formul.</td>
      <td><b>A</b>dults formul.</td>
    </tr>
    
    <tr>
      <td class="numbers">64.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px;">ART Regimens</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">0</td>
      <td>{{zero_p}}</td>
      <td>{{zero_a}}</td>
    </tr>
    
    <tr>
      <td class="numbers">65.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">2</td>
      <td>{{two_p}}</td>
      <td>{{two_a}}</td>
    </tr>
    
    <tr>
      <td class="numbers">66.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        text-align:left; border-left-width:0px; border-top-width:0px;" colspan="3">Count regimen for <u>all patients registered</u></td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">4</td>
      <td>{{four_p}}</td>
      <td>{{four_a}}</td>
    </tr>
    
    <tr>
      <td class="numbers">67.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        text-align:left; border-left-width:0px; border-top-width:0px;" colspan="3">at this site, including those who currently</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">5</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td>{{five_a}}</td>
    </tr>
    
    <tr>
      <td class="numbers">68.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px; border-style:dotted;
       border-bottom-width: 1px; border-right-width: 0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 1px; border-style:dotted;
        border-left-width:0px; border-top-width:0px; text-align:left;" colspan="3">get supplies from another site</td>
      <td style="border-right-width:0px; border-bottom-width: 1px; border-style:dotted;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 1px; border-style: dotted;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">6</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td>{{six_a}}</td>
    </tr>
    
    <tr>
      <td class="numbers">69.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        text-align:left; border-left-width:0px; border-top-width:0px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">7</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td>{{seven_a}}</td>
    </tr>
    
    <tr>
      <td class="numbers">70.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        text-align:left; border-left-width:0px; border-top-width:0px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">8</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td>{{eight_a}}</td>
    </tr>
    
    <tr>
      <td class="numbers">71.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        text-align:left; border-left-width:0px; border-top-width:0px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">9</td>
      <td>{{nine_p}}</td>
      <td>{{nine_a}}</td>
    </tr>
    
    <tr>
      <td class="numbers">72.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        text-align:left; border-left-width:0px; border-top-width:0px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">10</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td>{{ten_a}}</td>
    </tr>
    
    <tr>
      <td class="numbers">73.</td>
      <td colspan="1" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:1px;">&nbsp;</td>
      <td style="border-right-width:1px; border-bottom-width: 0px;
        text-align:left; border-left-width:0px; border-top-width:1px;" colspan="4">Specify ‘Other’ Regimens and number of patients on each</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">11</td>
      <td>{{eleven_p}}</td>
      <td>{{eleven_a}}</td>
    </tr>
    
    <tr>
      <td class="numbers">74.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px; border-top-style:dotted;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:1px;">&nbsp;</td>
      <td style="border-right-width:1px; border-bottom-width: 0px; border-top-style:dotted;
        text-align:left; border-left-width:0px; border-top-width:1px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">12</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td>{{twelve_a}}</td>
    </tr>
    
    <tr>
      <td class="numbers">75.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px; border-top-style:dotted;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:1px;">&nbsp;</td>
      <td style="border-right-width:1px; border-bottom-width: 0px; border-top-style:dotted;
        text-align:left; border-left-width:0px; border-top-width:1px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">13</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td>{{thirteen_a}}</td>
    </tr>
    
    <tr>
      <td class="numbers">76.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px; border-top-style:dotted;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:1px;">&nbsp;</td>
      <td style="border-right-width:1px; border-bottom-width: 0px; border-top-style:dotted;
        text-align:left; border-left-width:0px; border-top-width:1px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">14</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td>{{fourteen_a}}</td>
    </tr>
    
    <tr>
      <td class="numbers">77.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px; border-top-style:dotted;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:1px;">&nbsp;</td>
      <td style="border-right-width:1px; border-bottom-width: 0px; border-top-style:dotted;
        text-align:left; border-left-width:0px; border-top-width:1px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">15</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td>{{fifteen_a}}</td>
    </tr>
    
    <tr>
      <td class="numbers">78.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px; border-top-style:dotted;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:1px;">&nbsp;</td>
      <td style="border-right-width:1px; border-bottom-width: 0px; border-top-style:dotted;
        text-align:left; border-left-width:0px; border-top-width:1px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">16</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td>{{sixteen_a}}</td>
    </tr>
    
    <tr>
      <td class="numbers">79.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px; border-top-style:dotted;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:1px;">&nbsp;</td>
      <td style="border-right-width:1px; border-bottom-width: 0px; border-top-style:dotted;
        text-align:left; border-left-width:0px; border-top-width:1px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">17</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td>{{seventeen_a}}</td>
    </tr>
    
    <tr>
      <td class="numbers">80.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px; border-top-style:dotted;
       border-bottom-width: 1px; border-right-width: 0px; border-top-width:1px;">&nbsp;</td>
      <td style="border-right-width:1px; border-bottom-width: 1px; border-top-style:dotted;
        text-align:left; border-left-width:0px; border-top-width:1px;" colspan="3">&nbsp;</td>
      <td colspan="2" style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;
        text-align:left; padding-left:10px;">Other (paed./adult)</td>
      <td>&nbsp;</td>
      <td>{{unknown_regimen}}</td>
    </tr>
    
    <tr class="horisonatl-separator">
      <td>&nbsp;</td>
      <td colspan="9" style="text-align: left;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">81.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-right-width:0px;">Pregnant / Breastfeeding</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px;" colspan="4">(as of the last visit before end of quarter)</td>
      <td style="font-weight: normal; border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">Pregnant</td>
      <td colspan="2" style="font-weight: normal;">{{total_pregnant_women}}</td>
    </tr>

    <tr>
      <td class="numbers">82.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px; border-top-width:0px;" colspan="4">&nbsp;</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">Breastfeeding</td>
      <td colspan="2" style="font-weight: normal;">{{total_breastfeeding_women}}</td>
    </tr>

    <tr>
      <td class="numbers">83.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 1px; border-top-width:0px;" colspan="4">&nbsp;</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:1px;
        text-align:left; padding-left:10px;" colspan="2">All others (not circled)</td>
      <td colspan="2" style="font-weight: normal;">{{total_other_patients}}</td>
    </tr>

    <tr class="horisonatl-separator">
      <td>&nbsp;</td>
      <td colspan="9" style="text-align: left;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">84.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-right-width:0px;" colspan="2">Current TB status<br/>any form of TB</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px;" colspan="3">(as of the last visit before end of quarter)</td>
      <td style="font-weight: normal; border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">TB not suspected</td>
      <td colspan="2" style="font-weight: normal;">{{tb_not_suspected}}</td>
    </tr>

    <tr>
      <td class="numbers">85.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px; border-top-width:0px;" colspan="4">&nbsp;</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">TB suspected</td>
      <td colspan="2" style="font-weight: normal;">{{tb_suspected}}</td>
    </tr>

    <tr>
      <td class="numbers">86.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px; border-top-width:0px;" colspan="4">&nbsp;</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">TB conf., <b>not</b> on Rx</td>
      <td colspan="2" style="font-weight: normal;">{{tb_confirmed_currently_not_yet_on_tb_treatment}}</td>
    </tr>

    <tr>
      <td class="numbers">87.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px; border-top-width:0px;" colspan="4">&nbsp;</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">TB conf., <b>on</b> TB Rx</td>
      <td colspan="2" style="font-weight: normal;">{{tb_confirmed_on_tb_treatment}}</td>
    </tr>

    <tr>
      <td class="numbers">88.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 1px; border-top-width:0px;" colspan="4">&nbsp;</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:1px;
        text-align:left; padding-left:10px;" colspan="2">Unknown (not circled)</td>
      <td colspan="2" style="font-weight: normal;">{{unknown_tb_status}}</td>
    </tr>

    <tr class="horisonatl-separator">
      <td>&nbsp;</td>
      <td colspan="9" style="text-align: left;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">89.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-right-width:0px;">Side effects</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px;" colspan="4">(as of the last visit before end of quarter)</td>
      <td style="font-weight: normal; border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">None</td>
      <td colspan="2" style="font-weight: normal;">{{total_patients_without_side_effects}}</td>
    </tr>

    <tr>
      <td class="numbers">90.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px; border-top-width:0px;" colspan="4">ADRReportformfilledforeachcase?(seeQ110.)◄</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">Any side effects</td>
      <td colspan="2" style="font-weight: normal;">{{total_patients_with_side_effects}}</td>
    </tr>

    <tr>
      <td class="numbers">91.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 1px; border-top-width:0px;" colspan="4">&nbsp;</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:1px;
        text-align:left; padding-left:10px;" colspan="2">Unknown (not circled)</td>
      <td colspan="2" style="font-weight: normal;">{{unknown_side_effects}}</td>
    </tr>

    <tr class="horisonatl-separator">
      <td>&nbsp;</td>
      <td colspan="9" style="text-align: left;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">92.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-right-width:0px;">Adherence</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px;" colspan="4">(as of the last visit before end of quarter)</td>
      <td style="font-weight: normal; border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">0 – 3 doses missed</td>
      <td colspan="2" style="font-weight: normal;">{{patients_with_0_6_doses_missed_at_their_last_visit}}</td>
    </tr>

    <tr>
      <td class="numbers">93.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px; border-top-width:0px;" colspan="4"></td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">4+ doses missed</td>
      <td colspan="2" style="font-weight: normal;">{{patients_with_7_plus_doses_missed_at_their_last_visit}}</td>
    </tr>

    <tr>
      <td class="numbers">94.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 1px; border-top-width:0px;" colspan="4">&nbsp;</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:1px;
        text-align:left; padding-left:10px;" colspan="2">Unknown (not circled)</td>
      <td colspan="2" style="font-weight: normal;">{{patients_with_unknown_adhrence}}</td>
    </tr>

    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td colspan="9" style="text-align:left; font-weight: bold; padding-left: 10px;">Preventive services / HIV related diseases</td>
    </tr>
    
    <tr>
      <td class="numbers">95.</td>
      <td style="text-align:left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px; font-weight: bold;">CPT / IPT</td>
      <td colspan="4" style="font-weight: normal; border-top-width:1px;
        border-left-width:0px; border-bottom-width:1px;
        text-align:left; padding-left:10px;">Approx. % of patients retained in ART who are currently on CPT / IPT</td>
      <td style="text-align:right; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px;">{{total_patients_on_arvs_and_cpt}}</td>
      <td style="font-weight:bold; order-top-width:1px; text-align:right;
        border-left-width:0px; border-bottom-width:1px; padding-right:5px;">CPT%</td>
      <td style="text-align:right; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px;">{{total_patients_on_arvs_and_ipt}}</td>
      <td style="font-weight:bold; order-top-width:1px; text-align: right;
        border-left-width:0px; border-bottom-width:1px; padding-right:5px;">IPT%</td>
    </tr>
    
    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td colspan="9">&nbsp;</td>
    </tr>
    
    <tr>
      <td class="numbers">96.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px; font-weight: bold;">PIFP</td>
      <td colspan="4" style="font-weight: normal; border-top-width:1px;
        border-left-width:0px; border-bottom-width:1px;
        text-align:left; padding-left:10px;">Approx. % of women who received Depo at ART in the last quarter</td>
      <!--td style="text-align: left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px;">{{total_patients_on_family_planning}}</td-->
      <td colspan="4" style="text-align: right; padding-right:10px; order-top-width:1px;
        border-left-width:0px; border-bottom-width:1px;"><span>{{total_patients_on_family_planning}}</span>&nbsp;%</td>
    </tr>
    
    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td colspan="9">&nbsp;</td>
    </tr>
    
    <tr>
      <td class="numbers">97.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px; font-weight: bold;">BP screen</td>
      <td colspan="4" style="font-weight: normal; border-top-width:1px;
        border-left-width:0px; border-bottom-width:1px;
        text-align:left; padding-left:10px;">Approx. % of adult ART patients with BP recorded at least once this year</td>
      <!--td style="text-align: left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px;">{{total_patients_with_screened_bp}}</td-->
      <td colspan="4" style="text-align: right; padding-right:10px; order-top-width:1px;
        border-left-width:0px; border-bottom-width:1px;"><span>{{total_patients_with_screened_bp}}</span>&nbsp;%</td>
    </tr>

    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td colspan="9">&nbsp;</td>
    </tr>
    
    <tr>
      <td class="numbers">98.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px; font-weight: bold;">PEP</td>
      <td colspan="4" style="font-weight: normal; border-top-width:1px;
        border-left-width:0px; border-bottom-width:1px;
        text-align:left; padding-left:10px;">Total persons given PEP in last quarter</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px;">&nbsp;</td>
      <td colspan="3" style="text-align: right; padding-right:10px; order-top-width:1px;
        border-left-width:0px; border-bottom-width:1px;">&nbsp;</td>
    </tr>


















































































  </table>

  </table>
</template>

<script>

export default {
  data: function(){
    return {
      items: [3,4,5,6,7,8,9],

      re_initiated_on_art: 0,
      cum_re_initiated_on_art: 0,

      newly_registered_quarterly: 0,
      newly_registered_cum: 0,
      quarterly_all_males: 0,
      cummulative_all_males: 0,

      pregnant_females_all_ages: 0,
      cum_pregnant_females_all_ages: 0,
      non_pregnant_females: 0,
      cum_non_pregnant_females: 0,
      children_below_24_months_at_art_initiation: 0,
      cum_children_below_24_months_at_art_initiation: 0,
      confirmed_hiv_infection_in_infants_pcr: 0,
      cum_confirmed_hiv_infection_in_infants_pcr: 0,
      quarterly_children_12_59_months: 0,
      cum_children_12_59_months: 0,
      breastfeeding_mothers: 0,
      cum_breastfeeding_mothers: 0,
      who_stage_two: 0,
      cum_who_stage_two: 0,
      asymptomatic: 0,
      cum_asymptomatic: 0,
      who_stage_three: 0,
      cum_who_stage_three: 0,
      who_stage_four: 0,
      cum_who_stage_four: 0,
      unknown_other_reason_outside_guidelines: 0,
      cum_unknown_other_reason_outside_guidelines: 0,
      no_tb: 0,
      cum_no_tb: 0,
      tb_within_the_last_two_years: 0,
      cum_tb_within_the_last_two_years: 0,
      current_episode_of_tb: 0,
      cum_current_episode_of_tb: 0,
      kaposis_sarcoma: 0,
      cum_kaposis_sarcoma: 0,
      total_alive_and_on_art: 0,
      died_within_the_1st_month_of_art_initiation: 0,
      died_within_the_2nd_month_of_art_initiation: 0,
      died_within_the_3rd_month_of_art_initiation: 0,
      died_after_the_3rd_month_of_art_initiation: 0,
      died_total: 0,
      defaulted: 0,
      stopped_art: 0,
      transfered_out: 0,
      zero_p: 0,
      zero_a: 0,
      two_p: 0,
      two_a: 0,
      four_p: 0,
      four_a: 0,
      five_a: 0,
      six_a: 0,
      seven_a: 0,
      eight_a: 0,
      nine_p: 0,
      nine_a: 0,
      ten_a: 0,
      eleven_p: 0,
      eleven_a: 0,
      twelve_a: 0,
      thirteen_a: 0,
      fourteen_a:  0,
      fifteen_a: 0,
      sixteen_a: 0,
      seventeen_a: 0,
      unknown_regimen: 0,
      total_pregnant_women: 0,
      total_breastfeeding_women: 0,
      total_other_patients: 0,
      tb_not_suspected: 0,
      tb_suspected: 0,
      tb_confirmed_currently_not_yet_on_tb_treatment: 0,
      tb_confirmed_on_tb_treatment: 0,
      unknown_tb_status: 0,
      total_patients_without_side_effects: 0,
      total_patients_with_side_effects: 0,
      unknown_side_effects: 0,
      patients_with_0_6_doses_missed_at_their_last_visit: 0,
      patients_with_7_plus_doses_missed_at_their_last_visit: 0,
      patients_with_unknown_adhrence: 0,
      total_patients_on_arvs_and_cpt: 0,
      total_patients_on_arvs_and_ipt: 0,
      total_patients_on_family_planning: 0,
      total_patients_with_screened_bp: 0,
      transfer_in: 0,
      cum_transfer_in: 0,
      males_initiated_on_art_first_time: 0,
      cum_males_initiated_on_art_first_time: 0,
      initial_pregnant_females_all_ages: 0,
      cum_initial_pregnant_females_all_ages: 0,
      initial_non_pregnant_females_all_ages: 0,
      cum_initial_non_pregnant_females_all_ages: 0,
      unknown_gender: 0,
      cum_unknown_gender: 0,
      initiated_on_art_first_time: 0,
      cum_initiated_on_art_first_time: 0
    }
  },
  props: ["params"],
  methods: {
   renderResults() {
    for(var i = 0; i < this.params.length; i++){
      //console.log(this.params[i].name);

      if(this.params[i].name == 're_initiated_on_art')
        this.re_initiated_on_art = this.params[i].contents;
     
      if(this.params[i].name == 'cum_re_initiated_on_art')
        this.cum_re_initiated_on_art = this.params[i].contents;
     
      if(this.params[i].name == 'transfer_in')
        this.transfer_in = this.params[i].contents;
     
      if(this.params[i].name == 'cum_transfer_in')
        this.cum_transfer_in = this.params[i].contents;

      if(this.params[i].name == 'total_registered')
        this.newly_registered_quarterly = this.params[i].contents;
      
      if(this.params[i].name == 'cum_total_registered')
        this.newly_registered_cum = this.params[i].contents;
      
      if(this.params[i].name == 'cum_all_males')
        this.cummulative_all_males = this.params[i].contents;
      
      if(this.params[i].name == 'all_males')
        this.quarterly_all_males = this.params[i].contents;
      
      if(this.params[i].name == 'non_pregnant_females')
        this.non_pregnant_females = this.params[i].contents;
      
      if(this.params[i].name == 'cum_non_pregnant_females')
        this.cum_non_pregnant_females = this.params[i].contents;
      
      if(this.params[i].name == 'pregnant_females_all_ages')
        this.pregnant_females_all_ages = this.params[i].contents;
      
      if(this.params[i].name == 'cum_pregnant_females_all_ages')
        this.cum_pregnant_females_all_ages = this.params[i].contents;
      
      if(this.params[i].name == 'children_below_24_months_at_art_initiation')
        this.children_below_24_months_at_art_initiation = this.params[i].contents;
      
      if(this.params[i].name == 'cum_children_below_24_months_at_art_initiation')
        this.cum_children_below_24_months_at_art_initiation = this.params[i].contents;
      
      if(this.params[i].name == 'children_24_months_14_years_at_art_initiation')
        this.children_24_months_14_years_at_art_initiation = this.params[i].contents;
      
      if(this.params[i].name == 'cum_children_24_months_14_years_at_art_initiation')
        this.cum_children_24_months_14_years_at_art_initiation = this.params[i].contents;
      
      if(this.params[i].name == 'adults_at_art_initiation')
        this.adults_at_art_initiation = this.params[i].contents;
      
      if(this.params[i].name == 'cum_adults_at_art_initiation')
        this.cum_adults_at_art_initiation = this.params[i].contents;
      
      if(this.params[i].name == 'presumed_severe_hiv_disease_in_infants')
        this.presumed_severe_hiv_disease_in_infants = this.params[i].contents;
      
      if(this.params[i].name == 'cum_presumed_severe_hiv_disease_in_infants')
        this.cum_presumed_severe_hiv_disease_in_infants = this.params[i].contents;
      
      if(this.params[i].name == 'confirmed_hiv_infection_in_infants_pcr')
        this.confirmed_hiv_infection_in_infants_pcr = this.params[i].contents;

      if(this.params[i].name == 'cum_confirmed_hiv_infection_in_infants_pcr')
        this.cum_confirmed_hiv_infection_in_infants_pcr = this.params[i].contents;

      if(this.params[i].name == 'quarterly_children_12_59_months')
        this.quarterly_children_12_59_months = this.params[i].contents;

      if(this.params[i].name == 'cum_children_12_59_months')
        this.cum_children_12_59_months = this.params[i].contents;

      if(this.params[i].name == 'pregnant_women')
        this.pregnant_women = this.params[i].contents;

      if(this.params[i].name == 'cum_pregnant_women')
        this.cum_pregnant_women = this.params[i].contents;

      if(this.params[i].name == 'breastfeeding_mothers')
        this.breastfeeding_mothers = this.params[i].contents;

      if(this.params[i].name == 'cum_breastfeeding_mothers')
        this.cum_breastfeeding_mothers = this.params[i].contents;

      if(this.params[i].name == 'who_stage_two')
        this.who_stage_two = this.params[i].contents;

      if(this.params[i].name == 'cum_who_stage_two')
        this.cum_who_stage_two = this.params[i].contents;

      if(this.params[i].name == 'asymptomatic')
        this.asymptomatic = this.params[i].contents;

      if(this.params[i].name == 'cum_asymptomatic')
        this.cum_asymptomatic = this.params[i].contents;

      if(this.params[i].name == 'who_stage_three')
        this.who_stage_three = this.params[i].contents;

      if(this.params[i].name == 'cum_who_stage_three')
        this.cum_who_stage_three = this.params[i].contents;

      if(this.params[i].name == 'who_stage_four')
        this.who_stage_four = this.params[i].contents;

      if(this.params[i].name == 'cum_who_stage_four')
        this.cum_who_stage_four = this.params[i].contents;

      if(this.params[i].name == 'unknown_other_reason_outside_guidelines')
        this.unknown_other_reason_outside_guidelines = this.params[i].contents;

      if(this.params[i].name == 'cum_unknown_other_reason_outside_guidelines')
        this.cum_unknown_other_reason_outside_guidelines = this.params[i].contents;

      if(this.params[i].name == 'no_tb')
        this.no_tb = this.params[i].contents;

      if(this.params[i].name == 'cum_no_tb')
        this.cum_no_tb = this.params[i].contents;

      if(this.params[i].name == 'tb_within_the_last_two_years')
        this.tb_within_the_last_two_years = this.params[i].contents;

      if(this.params[i].name == 'cum_tb_within_the_last_two_years')
        this.cum_tb_within_the_last_two_years = this.params[i].contents;

      if(this.params[i].name == 'current_episode_of_tb')
        this.current_episode_of_tb = this.params[i].contents;

      if(this.params[i].name == 'cum_current_episode_of_tb')
        this.cum_current_episode_of_tb = this.params[i].contents;

      if(this.params[i].name == 'kaposis_sarcoma')
        this.kaposis_sarcoma = this.params[i].contents;

      if(this.params[i].name == 'cum_kaposis_sarcoma')
        this.cum_kaposis_sarcoma = this.params[i].contents;

      if(this.params[i].name == 'total_alive_and_on_art')
        this.total_alive_and_on_art = this.params[i].contents;

      if(this.params[i].name == 'died_within_the_1st_month_of_art_initiation')
        this.died_within_the_1st_month_of_art_initiation = this.params[i].contents;

      if(this.params[i].name == 'died_within_the_2nd_month_of_art_initiation')
        this.died_within_the_2nd_month_of_art_initiation = this.params[i].contents;

      if(this.params[i].name == 'died_within_the_3rd_month_of_art_initiation')
        this.died_within_the_3rd_month_of_art_initiation = this.params[i].contents;

      if(this.params[i].name == 'died_after_the_3rd_month_of_art_initiation')
        this.died_after_the_3rd_month_of_art_initiation = this.params[i].contents;

      if(this.params[i].name == 'died_total')
        this.died_total = this.params[i].contents;

      if(this.params[i].name == 'defaulted')
        this.defaulted = this.params[i].contents;

      if(this.params[i].name == 'stopped_art')
        this.stopped_art = this.params[i].contents;

      if(this.params[i].name == 'transfered_out')
        this.transfered_out = this.params[i].contents;

      if(this.params[i].name == 'zero_p')
        this.zero_p = this.params[i].contents;

      if(this.params[i].name == 'zero_a')
        this.zero_a = this.params[i].contents;

      if(this.params[i].name == 'two_p')
        this.two_p = this.params[i].contents;

      if(this.params[i].name == 'two_a')
        this.two_a = this.params[i].contents;

      if(this.params[i].name == 'four_p')
        this.four_p = this.params[i].contents;

      if(this.params[i].name == 'four_a')
        this.four_a = this.params[i].contents;

      if(this.params[i].name == 'five_a')
        this.five_a = this.params[i].contents;

      if(this.params[i].name == 'six_a')
        this.six_a = this.params[i].contents;

      if(this.params[i].name == 'seven_a')
        this.seven_a = this.params[i].contents;

      if(this.params[i].name == 'eight_a')
        this.eight_a = this.params[i].contents;

      if(this.params[i].name == 'nine_p')
        this.nine_p = this.params[i].contents;

      if(this.params[i].name == 'nine_a')
        this.nine_a = this.params[i].contents;

      if(this.params[i].name == 'ten_a')
        this.ten_a = this.params[i].contents;

      if(this.params[i].name == 'eleven_p')
        this.eleven_p = this.params[i].contents;

      if(this.params[i].name == 'eleven_a')
        this.eleven_a = this.params[i].contents;

      if(this.params[i].name == 'thirteen_a')
        this.thirteen_a = this.params[i].contents;

      if(this.params[i].name == 'fourteen_a')
        this.fourteen_a = this.params[i].contents;

      if(this.params[i].name == 'fifteen_a')
        this.fifteen_a = this.params[i].contents;

      if(this.params[i].name == 'sixteen_a')
        this.sixteen_a = this.params[i].contents;

      if(this.params[i].name == 'seventeen_a')
        this.seventeen_a = this.params[i].contents;

      if(this.params[i].name == 'unknown_regimen')
        this.unknown_regimen = this.params[i].contents;
    
      if(this.params[i].name == 'total_pregnant_women')
        this.total_pregnant_women = this.params[i].contents;

      if(this.params[i].name == 'total_breastfeeding_women')
        this.total_breastfeeding_women = this.params[i].contents;

      if(this.params[i].name == 'total_other_patients')
        this.total_other_patients = this.params[i].contents;

      if(this.params[i].name == 'tb_not_suspected')
        this.tb_not_suspected = this.params[i].contents;
      
      if(this.params[i].name == 'tb_suspected')
         this.tb_suspected = this.params[i].contents;

      if(this.params[i].name == 'tb_not_suspected')
        this.tb_not_suspected = this.params[i].contents;
   
      if(this.params[i].name == 'tb_confirmed_currently_not_yet_on_tb_treatment')
        this.tb_confirmed_currently_not_yet_on_tb_treatment = this.params[i].contents;
   
      if(this.params[i].name == 'tb_confirmed_on_tb_treatment')
        this.tb_confirmed_on_tb_treatment = this.params[i].contents;
   
      if(this.params[i].name == 'unknown_tb_status')
        this.unknown_tb_status = this.params[i].contents;

      if(this.params[i].name == 'total_patients_without_side_effects')
        this.total_patients_without_side_effects = this.params[i].contents;

      if(this.params[i].name == 'total_patients_with_side_effects')
        this.total_patients_with_side_effects = this.params[i].contents;

      if(this.params[i].name == 'unknown_side_effects')
        this.unknown_side_effects = this.params[i].contents;

      if(this.params[i].name == 'patients_with_0_6_doses_missed_at_their_last_visit')
        this.patients_with_0_6_doses_missed_at_their_last_visit = this.params[i].contents;

      if(this.params[i].name == 'patients_with_7_plus_doses_missed_at_their_last_visit')
        this.patients_with_7_plus_doses_missed_at_their_last_visit = this.params[i].contents;

      if(this.params[i].name == 'patients_with_unknown_adhrence')
        this.patients_with_unknown_adhrence = this.params[i].contents;

      if(this.params[i].name == 'total_patients_on_arvs_and_cpt')
        this.total_patients_on_arvs_and_cpt = this.params[i].contents;

      if(this.params[i].name == 'total_patients_on_arvs_and_ipt')
        this.total_patients_on_arvs_and_ipt = this.params[i].contents;

      if(this.params[i].name == 'total_patients_on_family_planning')
        this.total_patients_on_family_planning = this.params[i].contents;

      if(this.params[i].name == 'total_patients_with_screened_bp')
        this.total_patients_with_screened_bp = this.params[i].contents;

      if(this.params[i].name == 'males_initiated_on_art_first_time')
        this.males_initiated_on_art_first_time = this.params[i].contents;

      if(this.params[i].name == 'cum_males_initiated_on_art_first_time')
        this.cum_males_initiated_on_art_first_time = this.params[i].contents;

      if(this.params[i].name == 'initial_pregnant_females_all_ages')
        this.initial_pregnant_females_all_ages = this.params[i].contents;

      if(this.params[i].name == 'cum_initial_pregnant_females_all_ages')
        this.cum_initial_pregnant_females_all_ages = this.params[i].contents;

      if(this.params[i].name == 'initial_non_pregnant_females_all_ages')
        this.initial_non_pregnant_females_all_ages = this.params[i].contents;

      if(this.params[i].name == 'cum_initial_non_pregnant_females_all_ages')
        this.cum_initial_non_pregnant_females_all_ages = this.params[i].contents;

      if(this.params[i].name == 'unknown_gender')
        this.unknown_gender = this.params[i].contents;

      if(this.params[i].name == 'cum_unknown_gender')
        this.cum_unknown_gender = this.params[i].contents;

      if(this.params[i].name == 'initiated_on_art_first_time')
        this.initiated_on_art_first_time = this.params[i].contents;

      if(this.params[i].name == 'cum_initiated_on_art_first_time')
        this.cum_initiated_on_art_first_time = this.params[i].contents;
   
    }
   }
  },
  watch: {
    params: {
      immediate: true,
      handler() {
        this.renderResults();
      }
    }
  }
}
</script>

<style scope>

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

tr {
  height: 45px;
}

.vertical-separator {
  border-width: 0px;
}

td {
  border-style: solid;
  border-width: 1px;
}

.section-description td {
  border-width: 0px;
}

.horisonatl-separator td {
  border-width: 0px;
}

.numbers {
  width: 2.5%;
  text-align: center;
  border-width: 0px 1px 0px 0px;
  border-style: dotted;
}

.sum-arrows {
  width: 75px;
  height: 55px;
}

.postfixes {
  font-size: x-small;
  font-weight: bold;
  position: relative;
  top: -15px;
  left: -40px;
}


</style>
