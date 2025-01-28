<script lang="ts" setup></script>

<template>
  <main>
    <div class="content-holder">
      <h1>{{ $t('pages.termsOfUse.title') }}</h1>
      <div class="terms-of-use-text">
        {{ $t('termsOfUseText.welcome') }}<br /><br />
        {{ $t('termsOfUseText.touAgreement') }}<br /><br />
        <ul>
          <li v-html="$t('termsOfUseText.privacyPolicy')"></li>
        </ul>
        <br />
        {{ $t('termsOfUseText.touDisagree') }}<br /><br />
        <h4>{{ $t('termsOfUseText.registration') }}</h4>
        <br />
        {{ $t('termsOfUseText.account') }}<br /><br />
        {{ $t('termsOfUseText.accountSecurity') }}<br /><br />
        <h4>{{ $t('termsOfUseText.childrenTitle') }}</h4>
        <br />
        {{ $t('termsOfUseText.childrenText') }}<br /><br />
        <h4>{{ $t('termsOfUseText.useRestrictions') }}</h4>
        <br />
        {{ $t('termsOfUseText.agreementNotTo') }}<br /><br />
        <ul>
          <li>{{ $t('termsOfUseText.antHarass') }}</li>
          <li>{{ $t('termsOfUseText.antImpersonate') }}</li>
          <li>{{ $t('termsOfUseText.antUnlawful') }}</li>
          <li>{{ $t('termsOfUseText.antAdvertise') }}</li>
          <li>{{ $t('termsOfUseText.antExploit') }}</li>
        </ul>
        <br />
        {{ $t('termsOfUseText.postTo') }}<br /><br />
        <ul>
          <li>{{ $t('termsOfUseText.ptCopyright') }}</li>
          <li>{{ $t('termsOfUseText.ptObscene') }}</li>
          <li>{{ $t('termsOfUseText.ptFraud') }}</li>
          <li>{{ $t('termsOfUseText.ptDiscrimination') }}</li>
          <li>{{ $t('termsOfUseText.ptViolate') }}</li>
        </ul>
        <br />
        {{ $t('termsOfUseText.furtherNotTo') }}<br /><br />
        <ul>
          <li>{{ $t('termsOfUseText.fntMirror') }}</li>
          <li>{{ $t('termsOfUseText.fntTest') }}</li>
          <li>{{ $t('termsOfUseText.fntDeactivate') }}</li>
          <li>{{ $t('termsOfUseText.fntDownload') }}</li>
          <li>{{ $t('termsOfUseText.fntDecipher') }}</li>
          <li>{{ $t('termsOfUseText.fntInterfere') }}</li>
          <li>{{ $t('termsOfUseText.fntHarvest') }}</li>
          <li>{{ $t('termsOfUseText.fntAutomate') }}</li>
          <li>{{ $t('termsOfUseText.fntFarm') }}</li>
          <li>{{ $t('termsOfUseText.fntScrape') }}</li>
          <li>{{ $t('termsOfUseText.fntEncourage') }}</li>
        </ul>
        <br />
        {{ $t('termsOfUseText.violationsResult') }}<br /><br />
        <h4>{{ $t('termsOfUseText.userContent') }}</h4>
        <br />
        {{ $t('termsOfUseText.userContentText') }}<br /><br />
        <h4>{{ $t('termsOfUseText.userContentLicense') }}</h4>
        <br />
        {{ $t('termsOfUseText.userContentLicenseText') }}<br /><br />
        <h4>{{ $t('termsOfUseText.monitoring') }}</h4>
        <br />
        {{ $t('termsOfUseText.monitoringEdit') }}<br /><br />
        {{ $t('termsOfUseText.monitoringRemove') }}<br /><br />
        {{ $t('termsOfUseText.monitoringSuspend') }}<br /><br />
        <h4>{{ $t('termsOfUseText.thirdParties') }}</h4>
        <br />
        {{ $t('termsOfUseText.tpPost') }}<br /><br />
        {{ $t('termsOfUseText.tpControl') }}<br /><br />
        {{ $t('termsOfUseText.tpLeave') }}<br /><br />
        {{ $t('termsOfUseText.tpResponsibility') }}<br /><br />
        <h4>{{ $t('termsOfUseText.intelectualProperty') }}</h4>
        <br />
        {{ $t('termsOfUseText.ipDistribute') }}<br /><br />
        {{ $t('termsOfUseText.ipCopyright') }}<br /><br />
        {{ $t('termsOfUseText.ipCopyrightOther') }}<br /><br />
        <h4>{{ $t('termsOfUseText.eCommunication') }}</h4>
        <br />
        {{ $t('termsOfUseText.ecAgree') }}<br /><br />
        {{ $t('termsOfUseText.ecUse') }}<br /><br />
        {{ $t('termsOfUseText.ecOptout') }}<br /><br />
        <h4>{{ $t('termsOfUseText.warrantyDisclaimer') }}</h4>
        <br />
        {{ $t('termsOfUseText.warrantyDisclaimerText') }}<br /><br />
        <h4>{{ $t('termsOfUseText.damagesLimitation') }}</h4>
        <br />
        {{ $t('termsOfUseText.dlResponsibility') }}<br /><br />
        {{ $t('termsOfUseText.dlDispute') }}<br /><br />
        <h4>{{ $t('termsOfUseText.touModification') }}</h4>
        <br />
        {{ $t('termsOfUseText.touChanges') }}<br /><br />
        {{ $t('termsOfUseText.touChangeNotice') }}<br /><br />
        <h4>{{ $t('termsOfUseText.generalTerms') }}</h4>
        <br />
        {{ $t('termsOfUseText.generalTermsText') }}<br /><br />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.terms-of-use-text {
  ul {
    padding-left: 20px;
  }
}
</style>
