import { VacuumStatusPipe } from './vacuum-status.pipe';

describe('VacuumStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new VacuumStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
