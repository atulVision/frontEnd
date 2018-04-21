import { TestBed, inject } from '@angular/core/testing';

import { MyDataTransferService } from './my-data-transfer.service';

describe('MyDataTransferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyDataTransferService]
    });
  });

  it('should be created', inject([MyDataTransferService], (service: MyDataTransferService) => {
    expect(service).toBeTruthy();
  }));
});
