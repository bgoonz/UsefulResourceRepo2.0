describe("index.js", () => {
  it("String: uses destructuring to declare five animal sounds", () => {
    expect(moo).to.exist
    expect(moo).to.equal("cow")
    expect(neigh).to.exist
    expect(neigh).to.equal("horse")
    expect(baa).to.exist
    expect(baa).to.equal("sheep")
    expect(oink).to.exist
    expect(oink).to.equal("pig")
    expect(cluck).to.exist
    expect(cluck).to.equal("chicken")
  })
  it("String: uses destructuring to declare the four traditional animal names", () => {
    expect(Bessie).to.exist
    expect(Bessie).to.equal("cow")
    expect(Dolly).to.exist
    expect(Dolly).to.equal("sheep")
    expect(Babe).to.exist
    expect(Babe).to.equal("pig")
    expect(Little).to.exist
    expect(Little).to.equal("chicken")
  })
  it("String: uses destructuring to declare the three traditional animal colors", () => {
    expect(black_and_white).to.exist
    expect(black_and_white).to.equal("cow")
    expect(black).to.exist
    expect(black).to.equal("sheep")
    expect(pink).to.exist
    expect(pink).to.equal("pig")
  })
  it("Array: uses destructuring to declare the seven traditional rainbow color variables using the color names", () => {
    expect(red).to.exist
    expect(red).to.equal("red")
    expect(orange).to.exist
    expect(orange).to.equal("orange")
    expect(yellow).to.exist
    expect(yellow).to.equal("yellow")
    expect(green).to.exist
    expect(green).to.equal("green")
    expect(blue).to.exist
    expect(blue).to.equal("blue")
    expect(indigo).to.exist
    expect(indigo).to.equal("indigo")
    expect(violet).to.exist
    expect(violet).to.equal("violet")
  })
  it("Array: uses destructuring to declare six rainbow color variables using initials", () => {
    expect(r).to.exist
    expect(r).to.equal("red")
    expect(o).to.exist
    expect(o).to.equal("orange")
    expect(y).to.exist
    expect(y).to.equal("yellow")
    expect(g).to.exist
    expect(g).to.equal("green")
    expect(b).to.exist
    expect(b).to.equal("blue")
    expect(v).to.exist
    expect(v).to.equal("violet")
  })
  it("Array: uses destructuring to declare Indigo using indg", () => {
    expect(indg).to.exist
    expect(indg).to.equal("indigo")
  })
  
  it("Object: uses destructuring to assign all appropriate variables using the keys as the variable names", () => {
    expect(name).to.exist
    expect(name).to.equal("Kermit")
    expect(color).to.exist
    expect(color).to.equal("green")
    expect(song).to.exist
    expect(song).to.equal("The Rainbow Connection")
    expect(job).to.exist
    expect(job).to.equal("Host of The Muppet Show")
    expect(partner).to.exist
    expect(partner).to.equal("Miss Piggy")
  })
  
  it("Object: uses destructuring to assign Kermit's color, songs 2 and 4, and Kermit's job and partner", () => {
    expect(song_2).to.exist
    expect(song_2).to.equal("Moving Right Along")
    expect(song_4).to.exist
    expect(song_4).to.equal("I Hope That Something Better Comes Along")
    expect(k_job).to.exist
    expect(k_job).to.equal("Host of The Muppet Show")
    expect(k_partner).to.exist
    expect(k_partner).to.equal("Miss Piggy")
  })
})
