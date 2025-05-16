// src/app/shared/services/logger.service.ts
import { Injectable } from '@angular/core';
import * as log from 'loglevel';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private apiUrl = 'http://localhost:8089/SpringMVC/logs';

  constructor(private http: HttpClient) {
    log.setLevel(log.levels.INFO);
  }

  info(...args: any[]) {
    log.info(...args);
    this.send('INFO', args);
  }

  debug(...args: any[]) {
    log.debug(...args);
    this.send('DEBUG', args);
  }

  error(...args: any[]) {
    log.error(...args);
    this.send('ERROR', args);
  }

  private send(level: string, message: any[]) {
    const payload = {
      level,
      timestamp: new Date().toISOString(),
      message: message.map(m => (typeof m === 'object' ? JSON.stringify(m) : m)).join(' ')
    };
    this.http.post(this.apiUrl, payload)
      .subscribe({ error: err => log.warn('Log server error:', err) });
  }
}
