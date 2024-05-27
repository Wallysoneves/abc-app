import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApresentadorTarefaComponent } from './apresentador-tarefa.component';

describe('ApresentadorTarefaComponent', () => {
  let component: ApresentadorTarefaComponent;
  let fixture: ComponentFixture<ApresentadorTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApresentadorTarefaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApresentadorTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
