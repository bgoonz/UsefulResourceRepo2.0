describe("Metronome", function() {
	afterEach(function() {
		Metronome.stop();
	});

	it("should be able to start", function() {
		Metronome.start();
		expect(Metronome.interval).not.toEqual(null);
	});

	it("should be able to stop", function() {
		Metronome.stop();
		expect(Metronome.interval).toEqual(null);
	});

	describe("when started", function() {
		beforeEach(function() {
			Metronome.load();
			Metronome.start();
			Metronome.tick();
		});

		it("should show the current beat", function() {
			expect(parseInt(document.getElementById('visual-target').innerHTML)).toEqual(Metronome.beat);
		});

		it("should have parsed tempo", function() {
			expect(Metronome.settings.tempo).toEqual(parseInt(Metronome.inputs.tempo.value));
		});

		it("should have parsed time", function() {
			expect(Metronome.settings.time).toEqual(Metronome.inputs.time.value);
		});

		it("should have parsed duration", function() {
			expect(Metronome.settings.duration).toEqual(parseFloat(Metronome.inputs.duration.value));
		});

		it("should have parsed frequencies", function() {
			expect(Metronome.settings.frequencies.downbeat).toEqual(parseInt(Metronome.inputs.frequencies.downbeat.value));
			expect(Metronome.settings.frequencies.strong).toEqual(parseInt(Metronome.inputs.frequencies.strong.value));
			expect(Metronome.settings.frequencies.weak).toEqual(parseInt(Metronome.inputs.frequencies.weak.value));
			expect(Metronome.settings.frequencies.tuner).toEqual(parseInt(Metronome.inputs.frequencies.tuner.value));
		});
	});

	describe("when stopped", function() {
		beforeEach(function() {
			Metronome.stop();
		});

		it("should have an empty beat indicator", function() {
			expect(document.getElementById('visual-target').innerHTML).toEqual('&nbsp;');
		});
	});
});
