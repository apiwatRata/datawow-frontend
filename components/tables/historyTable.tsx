"use client";

import {Pagination, Table} from "@heroui/react";
import {useEffect, useMemo, useState} from "react";
import { getReservationHistory } from '@/lib/reservations';

const columns = [
  {id: "concert_name", name: "Concert Name"},
  {id: "email", name: "Email"},
  {id: "status", name: "Status"},
  {id: "updated_at", name: "Timestamp"}
];

const ROWS_PER_PAGE = 20;

export default function HistoryTable() {
  const [page, setPage] = useState(1);
  const [logs, setLogs] = useState<any[]>([]);
  const totalPages = Math.ceil(logs.length / ROWS_PER_PAGE);
  const pages = Array.from({length: totalPages}, (_, i) => i + 1);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;

    return logs.slice(start, start + ROWS_PER_PAGE);
  }, [page]);

  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, logs.length);

  useEffect(()=>{
    const loadConcerts = async () => {
            try {
                const data = await getReservationHistory();
                if (Array.isArray(data.data) && data.data.length > 0) {
                    const result = data.data.map(item => {
                        return {
                            id: item.id,
                            concert_name: item.concert.name,
                            email: item.user.email,
                            status: item.status,
                            updated_at: item.updated_at
                        }
                    });
                    setLogs(result)
                }
                
            } catch (err) {
                console.error("Failed to load concerts", err);
            }
        };
    loadConcerts();
  }, [])

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Table with pagination" className="min-w-[600px]">
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column isRowHeader={column.id === "concert_name"}>{column.name}</Table.Column>
            )}
          </Table.Header>
          <Table.Body items={paginatedItems}>
            {(log) => (
              <Table.Row key={log.id}>
                <Table.Collection items={columns}>
                  {(column) => <Table.Cell>{log[column.id as keyof typeof logs]}</Table.Cell>}
                </Table.Collection>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer>
        <Pagination size="sm">
          <Pagination.Summary>
            {start} to {end} of {logs.length} results
          </Pagination.Summary>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}
                onPress={() => setPage((p) => Math.max(1, p - 1))}
              >
                <Pagination.PreviousIcon />
                Prev
              </Pagination.Previous>
            </Pagination.Item>
            {pages.map((p) => (
              <Pagination.Item key={p}>
                <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === totalPages}
                onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>
    </Table>
  );
}