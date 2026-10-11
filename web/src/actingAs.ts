// Who's doing this on a wall screen: the person picked in the header, while they stay picked.
// Pure, so node tests load it (web/test/actingAs.test.ts).

type Person = { id: string; grownUp?: boolean }

/** The picked person when they may do this, else null: ask "Who?" as usual. The pick says who's
 * doing something, never who's signed in, so it unlocks nothing private. */
export function actingMember<P extends Person>(pickedId: string | null | undefined, members: P[], allowed: (m: P) => boolean = () => true): P | null {
  const m = pickedId ? members.find(x => x.id === pickedId) : undefined
  return m && allowed(m) ? m : null
}

/** A wall screen forgets its picked person when it goes idle; other devices keep theirs. */
export const pickAfterIdle = (wall: boolean, picked: string | null) => wall ? null : picked
