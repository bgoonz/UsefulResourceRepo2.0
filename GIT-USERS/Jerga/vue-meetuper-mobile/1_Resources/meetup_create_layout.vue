<nb-container>
  <!-- Provide Navigation to App Header -->
  <AppHeader />
  <!-- Provide Styles Here -->
  <view :style="styles.container">
    <nb-text :style="styles.headerOne">Create Meetup</nb-text>
  </view>
  <nb-content>
    <nb-form>
      <nb-item stackedLabel>
        <nb-label>Location</nb-label>
        <nb-input/>
      </nb-item>
      <nb-item stackedLabel>
        <nb-label>Title</nb-label>
        <nb-input/>
      </nb-item>
      <nb-item stackedLabel>
        <nb-label>Start Date</nb-label>
        <nb-input />
      </nb-item>
      <nb-item stackedLabel>
        <nb-label>Time From</nb-label>
        <nb-input/>
      </nb-item>
      <nb-item stackedLabel>
        <nb-label>Time To</nb-label>
        <nb-input/>
      </nb-item>
      <nb-item stackedLabel>
        <nb-label>Category</nb-label>
        <nb-input/>
      </nb-item>
      <nb-item stackedLabel>
        <nb-label>Image</nb-label>
        <nb-input/>
      </nb-item>
      <nb-item stackedLabel>
        <nb-label>Description</nb-label>
        <nb-input/>
      </nb-item>
      <nb-item stackedLabel>
        <nb-label>Additional Info</nb-label>
        <nb-input/>
      </nb-item>
      <nb-button block>
        <nb-text>Create Meetup</nb-text>
      </nb-button>
    </nb-form>
  </nb-content>
</nb-container>
