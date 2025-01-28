<script lang="ts" setup></script>

<template>
  <main>
    <div class="content-holder">
      <h1>{{ $t('pages.privacyPolicy.title') }}</h1>
      <div class="privacy-policy-text">
        {{ $t('privacyPolicy.intro') }}<br /><br />
        <h4>{{ $t('privacyPolicy.collectedDataTitle') }}</h4>
        <br />
        {{ $t('privacyPolicy.cdDetailsTitle') }}<br /><br />
        <ul>
          <li>{{ $t('privacyPolicy.cdBasic') }}</li>
          <li>{{ $t('privacyPolicy.cdserviceUse') }}</li>
        </ul>
        <br />
        {{ $t('privacyPolicy.cdOutro') }}<br /><br />
        <h4>{{ $t('privacyPolicy.dataSourcesTitle') }}</h4>
        <br />
        {{ $t('privacyPolicy.dataProvider') }}<br /><br />
        {{ $t('privacyPolicy.dataProvideAgree') }}<br /><br />
        {{ $t('privacyPolicy.dataProvideDisagree') }}<br /><br />
        {{ $t('privacyPolicy.dataAccurate') }}<br /><br />
        <h4>{{ $t('privacyPolicy.dataUsageTitle') }}</h4>
        <br />
        {{ $t('privacyPolicy.dataUseIntro') }}<br /><br />
        <ul>
          <li>{{ $t('privacyPolicy.duManage') }}</li>
          <li>{{ $t('privacyPolicy.duDeliver') }}</li>
          <li>{{ $t('privacyPolicy.duResearch') }}</li>
          <li>{{ $t('privacyPolicy.duSecurity') }}</li>
          <li>{{ $t('privacyPolicy.duLegal') }}</li>
          <li>{{ $t('privacyPolicy.duFeedback') }}</li>
          <li>{{ $t('privacyPolicy.duMarketing') }}</li>
          <li>{{ $t('privacyPolicy.duNewsletters') }}</li>
          <li>{{ $t('privacyPolicy.duConsent') }}</li>
        </ul>
        <br />
        <h4>{{ $t('privacyPolicy.dataShareTitle') }}</h4>
        <br />
        {{ $t('privacyPolicy.dataShareIntro') }}<br /><br />
        <ul>
          <li>{{ $t('privacyPolicy.dsPartners') }}</li>
          <li>{{ $t('privacyPolicy.dsLaw') }}</li>
          <li>{{ $t('privacyPolicy.dsProcessors') }}</li>
        </ul>
        <br />
        <h4>{{ $t('privacyPolicy.dataDurationTitle') }}</h4>
        <br />
        {{ $t('privacyPolicy.ddIntro') }}<br /><br />
        {{ $t('privacyPolicy.ddListIntro') }}<br /><br />
        <ul>
          <li>{{ $t('privacyPolicy.ddDuration') }}</li>
          <li>{{ $t('privacyPolicy.ddCompliance') }}</li>
          <li>{{ $t('privacyPolicy.ddClaims') }}</li>
          <li>{{ $t('privacyPolicy.ddInvestigations') }}</li>
          <li>{{ $t('privacyPolicy.ddDisputes') }}</li>
        </ul>
        <br />
        {{ $t('privacyPolicy.dataExpiration') }}<br /><br />
        {{ $t('privacyPolicy.specificData') }}<br /><br />
        <h4>{{ $t('privacyPolicy.dataTransfers') }}</h4>
        <br />
        {{ $t('privacyPolicy.dtIntro') }}<br /><br />
        {{ $t('privacyPolicy.dtListIntro') }}<br /><br />
        <ul>
          <li>{{ $t('privacyPolicy.dtCovered') }}</li>
          <li>{{ $t('privacyPolicy.dtProtection') }}</li>
          <li>{{ $t('privacyPolicy.dtOther') }}</li>
        </ul>
        <br />
        <h4>{{ $t('privacyPolicy.yourRights') }}</h4>
        <br />
        {{ $t('privacyPolicy.rightsIntro') }}<br /><br />
        {{ $t('privacyPolicy.rightsSecurity') }}<br /><br />
        {{ $t('privacyPolicy.rightsListIntro') }}<br /><br />
        <ul>
          <li>{{ $t('privacyPolicy.rightsAccess') }}</li>
          <li>{{ $t('privacyPolicy.rightRectification') }}</li>
          <li>{{ $t('privacyPolicy.rightErasure') }}</li>
          <li>{{ $t('privacyPolicy.rightRestriction') }}</li>
          <li>{{ $t('privacyPolicy.rightPortability') }}</li>
          <li>{{ $t('privacyPolicy.rightProcessing') }}</li>
          <li>{{ $t('privacyPolicy.rightDecision') }}</li>
          <li>{{ $t('privacyPolicy.rightWithdraw') }}</li>
          <li>{{ $t('privacyPolicy.rightComplaint') }}</li>
        </ul>
        <br />
        <h4>{{ $t('privacyPolicy.externalSources') }}</h4>
        <br />
        {{ $t('privacyPolicy.esLinks') }}<br /><br />
        {{ $t('privacyPolicy.ppAplies') }}<br /><br />
        {{ $t('privacyPolicy.accessExternal') }}<br /><br />
        {{ $t('privacyPolicy.esLiability') }}<br /><br />
        <h4>{{ $t('privacyPolicy.changes') }}</h4>
        <br />
        {{ $t('privacyPolicy.ppChanges') }}<br /><br />
        <h4>{{ $t('privacyPolicy.security') }}</h4>
        <br />
        {{ $t('privacyPolicy.platformSecurity') }}<br /><br />
        {{ $t('privacyPolicy.securityContact') }}<br /><br />
        {{ $t('privacyPolicy.generalInquiries') }}<br /><br />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.privacy-policy-text {
  ul {
    padding-left: 20px;
  }
}
</style>
