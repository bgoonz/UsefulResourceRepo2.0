<nb-container>
  <!-- meetup title -->
  <nb-h1>Hiking in Almada</nb-h1>
  <!-- meetup creator avatar  -->
  <nb-thumbnail />
  <!-- apply styles label and padding left -->
  <!-- meetup creator name -->
  <nb-text>
    by Filip Jerga
  </nb-text>
  <nb-content>
    <nb-card>
      <nb-card-item header bordered>
        <nb-text>Details</nb-text>
      </nb-card-item>
      <nb-card-item bordered>
        <nb-body>
          <!-- Label Styles -->
          <nb-text>
            Date
          </nb-text>
          <nb-text>
            14th Feb 2018
          </nb-text>
          <!-- Label Styles -->
          <nb-text>
            From
          </nb-text>
          <nb-text>
            14:00
          </nb-text>
          <!-- Label Styles -->
          <nb-text>
            To
          </nb-text>
          <nb-text>
            13:00
          </nb-text>
          <!-- Label Styles -->
          <nb-text>
            Category
          </nb-text>
          <nb-text>
            Music
          </nb-text>
          <!-- Label Styles -->
          <nb-text>
            Info
          </nb-text>
          <!-- Label Styles -->
          <!-- short info -->
          <nb-text>
            Some nice short info
          </nb-text>
        </nb-body>
      </nb-card-item>
      <nb-card-item header bordered>
        <nb-text>Description</nb-text>
      </nb-card-item>
      <nb-card-item bordered>
        <nb-body>
          <!-- description -->
          <nb-text>
            NativeBase is a free and open source framework that enable developers to build high-quality mobile apps using React Native iOS and Android apps with a fusion of ES6.
          </nb-text>
        </nb-body>
      </nb-card-item>
    </nb-card>
  </nb-content>
</nb-container>

export default { headerOne: { fontWeight: 'bold', fontSize: 23 }, label: {
fontWeight: 'bold', marginBottom: 3, fontSize: 17 }, centerContainer: {
justifyContent: "space-between", alignItems: "center" }, container: { padding:
20 } }
