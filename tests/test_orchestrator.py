import pytest
from backend.agents.orchestrator import Orchestrator, _run_agent
from backend.models.schemas import UserQuery

def test_isolated_agent_executor_success():
    def dummy_success():
        return {"summary": "All good", "badge": "OK"}
    res, rec = _run_agent("Test Agent", dummy_success)
    assert res == {"summary": "All good", "badge": "OK"}
    assert rec.status == "completed"
    assert rec.summary == "All good"

def test_isolated_agent_executor_failure_isolation():
    def dummy_failing():
        raise ValueError("Sensor connection timed out")
    res, rec = _run_agent("Faulty Sensor Agent", dummy_failing)
    assert res is None
    assert rec.status == "failed"
    assert "ValueError" in rec.summary
    assert rec.duration_ms >= 0

def test_orchestrator_selective_execution():
    orchestrator = Orchestrator()
    # Query specifying only weather inquiry
    query = UserQuery(query="What is the wave height and wind speed?", language="en")
    resp = orchestrator.process_query(query)
    assert resp is not None
    assert resp.conversation_id is not None
    assert len(resp.execution_trace) > 0
    # Execution trace has records
    assert any(rec.status in ["completed", "skipped"] for rec in resp.execution_trace)

def test_orchestrator_unknown_agent_does_not_crash():
    orchestrator = Orchestrator()
    query = UserQuery(query="Are there fish nearby?", language="en")
    resp = orchestrator.process_query(query)
    assert resp.risk_level in ["LOW", "MODERATE", "HIGH", "CRITICAL"]
    assert resp.answer != ""
